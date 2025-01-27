// import { WebSocket } from 'ws';
// import { handleMessage } from './messageHandler';
// import {
//   getAvailableEmbeddingModelProviders,
//   getAvailableChatModelProviders,
// } from '../lib/providers';
// import { BaseChatModel } from '@langchain/core/language_models/chat_models';
// import type { Embeddings } from '@langchain/core/embeddings';
// import type { IncomingMessage } from 'http';
// import logger from '../utils/logger';
// import { ChatOpenAI } from '@langchain/openai';

// export const handleConnection = async (
//   ws: WebSocket,
//   request: IncomingMessage,
// ) => {
//   try {
//     const searchParams = new URL(request.url, `http://${request.headers.host}`)
//       .searchParams;

//     const [chatModelProviders, embeddingModelProviders] = await Promise.all([
//       getAvailableChatModelProviders(),
//       getAvailableEmbeddingModelProviders(),
//     ]);

//     const chatModelProvider =
//       searchParams.get('chatModelProvider') ||
//       Object.keys(chatModelProviders)[0];
//     const chatModel =
//       searchParams.get('chatModel') ||
//       Object.keys(chatModelProviders[chatModelProvider])[0];

//     const embeddingModelProvider =
//       searchParams.get('embeddingModelProvider') ||
//       Object.keys(embeddingModelProviders)[0];
//     const embeddingModel =
//       searchParams.get('embeddingModel') ||
//       Object.keys(embeddingModelProviders[embeddingModelProvider])[0];

//     let llm: BaseChatModel | undefined;
//     let embeddings: Embeddings | undefined;

//     if (
//       chatModelProviders[chatModelProvider] &&
//       chatModelProviders[chatModelProvider][chatModel] &&
//       chatModelProvider != 'custom_openai'
//     ) {
//       llm = chatModelProviders[chatModelProvider][chatModel]
//         .model as unknown as BaseChatModel | undefined;
//     } else if (chatModelProvider == 'custom_openai') {
//       llm = new ChatOpenAI({
//         modelName: chatModel,
//         openAIApiKey: searchParams.get('openAIApiKey'),
//         temperature: 0.7,
//         configuration: {
//           baseURL: searchParams.get('openAIBaseURL'),
//         },
//       }) as unknown as BaseChatModel;
//     }

//     if (
//       embeddingModelProviders[embeddingModelProvider] &&
//       embeddingModelProviders[embeddingModelProvider][embeddingModel]
//     ) {
//       embeddings = embeddingModelProviders[embeddingModelProvider][
//         embeddingModel
//       ].model as Embeddings | undefined;
//     }

//     if (!llm || !embeddings) {
//       ws.send(
//         JSON.stringify({
//           type: 'error',
//           data: 'Invalid LLM or embeddings model selected, please refresh the page and try again.',
//           key: 'INVALID_MODEL_SELECTED',
//         }),
//       );
//       ws.close();
//     }

//     const interval = setInterval(() => {
//       if (ws.readyState === ws.OPEN) {
//         ws.send(
//           JSON.stringify({
//             type: 'signal',
//             data: 'open',
//           }),
//         );
//         clearInterval(interval);
//       }
//     }, 5);

//     ws.on(
//       'message',
//       async (message) =>
//         await handleMessage(message.toString(), ws, llm, embeddings),
//     );

//     ws.on('close', () => logger.debug('Connection closed'));
//   } catch (err) {
//     ws.send(
//       JSON.stringify({
//         type: 'error',
//         data: 'Internal server error.',
//         key: 'INTERNAL_SERVER_ERROR',
//       }),
//     );
//     ws.close();
//     logger.error(err);
//   }
// };
import { WebSocket } from 'ws';
import { handleMessage } from './messageHandler';
import {
  getAvailableEmbeddingModelProviders,
  getAvailableChatModelProviders,
} from '../lib/providers';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Embeddings } from '@langchain/core/embeddings';
import type { IncomingMessage } from 'http';
import logger from '../utils/logger';
import { ChatOpenAI } from '@langchain/openai';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: 1, // Allow 10 messages
  duration: 15, // Per 60 seconds
});
let requestCount = 0;

export const handleConnection = async (
  ws: WebSocket,
  request: IncomingMessage,
) => {
  try {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const searchParams = new URL(request.url, `http://${request.headers.host}`)
      .searchParams;

    const [chatModelProviders, embeddingModelProviders] = await Promise.all([
      getAvailableChatModelProviders(),
      getAvailableEmbeddingModelProviders(),
    ]);

    const chatModelProvider =
      searchParams.get('chatModelProvider') ||
      Object.keys(chatModelProviders)[0];
    const chatModel =
      searchParams.get('chatModel') ||
      Object.keys(chatModelProviders[chatModelProvider])[0];

    const embeddingModelProvider =
      searchParams.get('embeddingModelProvider') ||
      Object.keys(embeddingModelProviders)[0];
    const embeddingModel =
      searchParams.get('embeddingModel') ||
      Object.keys(embeddingModelProviders[embeddingModelProvider])[0];

    let llm: BaseChatModel | undefined;
    let embeddings: Embeddings | undefined;

    if (
      chatModelProviders[chatModelProvider] &&
      chatModelProviders[chatModelProvider][chatModel] &&
      chatModelProvider != 'custom_openai'
    ) {
      llm = chatModelProviders[chatModelProvider][chatModel]
        .model as unknown as BaseChatModel | undefined;
    } else if (chatModelProvider == 'custom_openai') {
      llm = new ChatOpenAI({
        modelName: chatModel,
        openAIApiKey: searchParams.get('openAIApiKey'),
        temperature: 0.7,
        configuration: {
          baseURL: searchParams.get('openAIBaseURL'),
        },
      }) as unknown as BaseChatModel;
    }

    if (
      embeddingModelProviders[embeddingModelProvider] &&
      embeddingModelProviders[embeddingModelProvider][embeddingModel]
    ) {
      embeddings = embeddingModelProviders[embeddingModelProvider][
        embeddingModel
      ].model as Embeddings | undefined;
    }

    if (!llm || !embeddings) {
      ws.send(
        JSON.stringify({
          type: 'error',
          data: 'Invalid LLM or embeddings model selected, please refresh the page and try again.',
          key: 'INVALID_MODEL_SELECTED',
        }),
      );
      ws.close();
      return;
    }

    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(
          JSON.stringify({
            type: 'signal',
            data: 'open',
          }),
        );
        clearInterval(interval);
      }
    }, 5);

    ws.on('message', async (message) => {
      try {
        // Apply rate limiting here
          rateLimiter.consume('userid', 1)
          .then(async (rateLimiterRes) => {
            requestCount++;
            console.log(`Total requests received so far: ${requestCount}`);
            await handleMessage(message.toString(), ws, llm, embeddings);
          })
          .catch((err) => {
            console.log(err.consumedPoints);
            ws.send(JSON.stringify({
              type: 'error',
              data: 'Too many messages. Please wait before sending more.',
              key: 'RATE_LIMIT_EXCEEDED',
            }),)
          });  
        // If within rate limit, process the message
      } catch (rateLimiterError) {
        if (rateLimiterError.remainingPoints === 0) {
          // Rate limit exceeded
          ws.send(
            JSON.stringify({
              type: 'error',
              data: 'Too many messages. Please wait before sending more.',
              key: 'RATE_LIMIT_EXCEEDED',
            }),
          );
        }
      }
    });

    ws.on('close', () => logger.debug('Connection closed'));
  } catch (err) {
    ws.send(
      JSON.stringify({
        type: 'error',
        data: 'Internal server error.',
        key: 'INTERNAL_SERVER_ERROR',
      }),
    );
    ws.close();
    logger.error(err);
  }
};