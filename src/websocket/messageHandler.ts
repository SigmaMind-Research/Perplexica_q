import { EventEmitter, WebSocket } from 'ws';
import { BaseMessage, AIMessage, HumanMessage } from '@langchain/core/messages';
import handleWebSearch from '../agents/webSearchAgent';
import handleAcademicSearch from '../agents/academicSearchAgent';
import handleWritingAssistant from '../agents/writingAssistant';
import handleWolframAlphaSearch from '../agents/wolframAlphaSearchAgent';
import handleYoutubeSearch from '../agents/youtubeSearchAgent';
import handleRedditSearch from '../agents/redditSearchAgent';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Embeddings } from '@langchain/core/embeddings';
import logger from '../utils/logger';
import db from '../db';
import { chats, messages as messagesSchema } from '../db/schema';
import { eq, asc, gt } from 'drizzle-orm';
import crypto, { UUID } from 'crypto';

type Message = {
  messageId: string;
  chatId: string;
  userId:string;
  content: string;
};

type WSMessage = {
  message: Message;
  optimizationMode: string;
  type: string;
  focusMode: string;
  history: Array<[string, string]>;
};

export const searchHandlers = {
  webSearch: handleWebSearch,
  academicSearch: handleAcademicSearch,
  writingAssistant: handleWritingAssistant,
  wolframAlphaSearch: handleWolframAlphaSearch,
  youtubeSearch: handleYoutubeSearch,
  redditSearch: handleRedditSearch,
};

const handleEmitterEvents = (
  emitter: EventEmitter,
  ws: WebSocket,
  messageId: string,
  chatId: string,
) => {
  let recievedMessage = '';
  let sources = [];

  emitter.on('data', (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.type === 'response') {
      ws.send(
        JSON.stringify({
          type: 'message',
          data: parsedData.data,
          messageId: messageId,
        }),
      );
      recievedMessage += parsedData.data;
    } else if (parsedData.type === 'sources') {
      ws.send(
        JSON.stringify({
          type: 'sources',
          data: parsedData.data,
          messageId: messageId,
        }),
      );
      sources = parsedData.data;
    }
  });
  emitter.on('end', () => {
    ws.send(JSON.stringify({ type: 'messageEnd', messageId: messageId }));

    db.insert(messagesSchema)
      .values({
        content: recievedMessage,
        chatId: chatId,
        messageId: messageId,
        role: 'assistant',
        metadata: JSON.stringify({
          createdAt: new Date(),
          ...(sources && sources.length > 0 && { sources }),
        }),
      })
      .execute();
  });
  emitter.on('error', (data) => {
    const parsedData = JSON.parse(data);
    ws.send(
      JSON.stringify({
        type: 'error',
        data: parsedData.data,
        key: 'CHAIN_ERROR',
      }),
    );
  });
};

export const handleMessage = async (
  message: string,
  ws: WebSocket,
  llm: BaseChatModel,
  embeddings: Embeddings,
) => {
  try {
    const parsedWSMessage = JSON.parse(message) as WSMessage;
    const parsedMessage = parsedWSMessage.message;

    const humanMessageId = crypto.randomBytes(7).toString('hex');
      // parsedMessage.messageId ?? crypto.randomBytes(7).toString('hex');
    const aiMessageId = crypto.randomBytes(7).toString('hex');

    if (!parsedMessage.content)
      return ws.send(
        JSON.stringify({
          type: 'error',
          data: 'Invalid message format',
          key: 'INVALID_FORMAT',
        }),
      );

    const history: BaseMessage[] = parsedWSMessage.history.map((msg) => {
      if (msg[0] === 'human') {
        return new HumanMessage({
          content: msg[1],
        });
      } else {
        return new AIMessage({
          content: msg[1],
        });
      }
    });

    if (parsedWSMessage.type === 'message') {
      const handler = searchHandlers[parsedWSMessage.focusMode];

      if (handler) {
        const emitter = handler(
          parsedMessage.content,
          history,
          llm,
          embeddings,
          parsedWSMessage.optimizationMode,
        );

        handleEmitterEvents(emitter, ws, aiMessageId, parsedMessage.chatId);

        const chat = await db.query.chats.findFirst({
          where: eq(chats.id, parsedMessage.chatId),
        });

        if (!chat) {
          // console.log(parsedMessage.userId);
          await db
            .insert(chats)
            .values({
              id: parsedMessage.chatId,
              title: parsedMessage.content,
              userId:parsedMessage.userId,
              createdAt: new Date().toString(),
              focusMode: parsedWSMessage.focusMode,
            })
            .execute();
        }

        const messageExists = await db.query.messages.findFirst({
          where: eq(messagesSchema.messageId, humanMessageId),
        });

        if (!messageExists) {
          await db
            .insert(messagesSchema)
            .values({
              content: parsedMessage.content,
              chatId: parsedMessage.chatId,
              messageId: humanMessageId,
              role: 'user',
              metadata: JSON.stringify({
                createdAt: new Date(),
              }),
            })
            .execute();
        } else {
          await db
            .delete(messagesSchema)
            .where(gt(messagesSchema.id, messageExists.id))
            .execute();
        }
      } else {
        ws.send(
          JSON.stringify({
            type: 'error',
            data: 'Invalid focus mode',
            key: 'INVALID_FOCUS_MODE',
          }),
        );
      }
    }
  } catch (err) {
    ws.send(
      JSON.stringify({
        type: 'error',
        data: 'Invalid message format',
        key: 'INVALID_FORMAT',
      }),
    );
    logger.error(`Failed to handle message: ${err}`);
  }
};
