import express from 'express';
import logger from '../utils/logger';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Embeddings } from '@langchain/core/embeddings';
import { AzureChatOpenAI,ChatOpenAI} from '@langchain/openai';
import {
  getAvailableChatModelProviders,
  getAvailableEmbeddingModelProviders,
} from '../lib/providers';
import { searchHandlers } from '../websocket/messageHandler';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';

const router = express.Router();

interface chatModel {
  provider: string;
  model: string;
  customOpenAIBaseURL?: string;
  customOpenAIKey?: string;
}

interface embeddingModel {
  provider: string;
  model: string;
}

interface ChatRequestBody {
  optimizationMode: 'speed' | 'balanced';
  focusMode: string;
  chatModel?: chatModel;
  embeddingModel?: embeddingModel;
  query: string;
  history: Array<[string, string]>;
}

router.post('/', async (req, res) => {
  try {
    const body: ChatRequestBody = req.body;

    if (!body.focusMode || !body.query) {
      return res.status(400).json({ message: 'Missing focus mode or query' });
    }

    body.history = body.history || [];
    body.optimizationMode = body.optimizationMode || 'balanced';

    const history: BaseMessage[] = body.history.map((msg) => {
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

    const [chatModelProviders, embeddingModelProviders] = await Promise.all([
      getAvailableChatModelProviders(),
      getAvailableEmbeddingModelProviders(),
    ]);

    const chatModelProvider =
      body.chatModel?.provider || Object.keys(chatModelProviders)[0];
    const chatModel =
      body.chatModel?.model ||
      Object.keys(chatModelProviders[chatModelProvider])[0];

    const embeddingModelProvider =
      body.embeddingModel?.provider || Object.keys(embeddingModelProviders)[0];
    const embeddingModel =
      body.embeddingModel?.model ||
      Object.keys(embeddingModelProviders[embeddingModelProvider])[0];

    let llm: BaseChatModel | undefined;
    let embeddings: Embeddings | undefined;

    if (body.chatModel?.provider === 'custom_openai') {
      if (
        !body.chatModel?.customOpenAIBaseURL ||
        !body.chatModel?.customOpenAIKey
      ) {
        return res
          .status(400)
          .json({ message: 'Missing custom OpenAI base URL or key' });
      }

      llm = new ChatOpenAI({
        modelName: body.chatModel.model,
        openAIApiKey: body.chatModel.customOpenAIKey,
        temperature: 0.7,
        configuration: {
          baseURL: body.chatModel.customOpenAIBaseURL,
        },
      }) as unknown as BaseChatModel;
    } else if (
      chatModelProviders[chatModelProvider] &&
      chatModelProviders[chatModelProvider][chatModel]
    ) {
      llm = chatModelProviders[chatModelProvider][chatModel]
        .model as unknown as BaseChatModel | undefined;
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
      return res.status(400).json({ message: 'Invalid model selected' });
    }

    const searchHandler = searchHandlers[body.focusMode];

    if (!searchHandler) {
      return res.status(400).json({ message: 'Invalid focus mode' });
    }

    const emitter = searchHandler(
      body.query,
      history,
      llm,
      embeddings,
      body.optimizationMode,
    );

    let message = '';
    let sources = [];

    emitter.on('data', (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'response') {
        message += parsedData.data;
      } else if (parsedData.type === 'sources') {
        sources = parsedData.data;
      }
    });

    emitter.on('end', () => {
      res.status(200).json({ message, sources });
    });

    emitter.on('error', (data) => {
      const parsedData = JSON.parse(data);
      res.status(500).json({ message: parsedData.data });
    });
  } catch (err: any) {
    logger.error(`Error in getting search results: ${err.message}`);
    res.status(500).json({ message: 'An error has occurred.' });
  }
});

export default router;

/*
for api access 
import express from 'express';
import logger from '../utils/logger';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Embeddings } from '@langchain/core/embeddings';
import { AzureChatOpenAI, ChatOpenAI } from '@langchain/openai';
import {
  getAvailableChatModelProviders,
  getAvailableEmbeddingModelProviders,
} from '../lib/providers';
import { searchHandlers } from '../websocket/messageHandler';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';

const router = express.Router();

// Default values if not provided
const DEFAULT_CHAT_MODEL = {
  provider: "openai",
  model: "gpt-4o-mini",
};

const DEFAULT_EMBEDDING_MODEL = {
  provider: "openai",
  model: "text-embedding-3-large",
};

interface ChatModel {
  provider: string;
  model: string;
  customOpenAIBaseURL?: string;
}

interface EmbeddingModel {
  provider: string;
  model: string;
}

interface ChatRequestBody {
  optimizationMode: 'speed' | 'balanced';
  focusMode: string;
  chatModel?: ChatModel;
  embeddingModel?: EmbeddingModel;
  query: string;
  history: Array<[string, string]>;
}

router.post('/', async (req, res) => {
  try {
    const body: ChatRequestBody = req.body;
    const authHeader = req.headers.authorization; // Extract Authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const bearerToken = authHeader.split(' ')[1]; // Extract the token

    // Ensure required fields are present
    if (!body.focusMode || !body.query) {
      return res.status(400).json({ message: 'Missing focus mode or query' });
    }

    // Apply defaults if missing
    body.chatModel = body.chatModel || DEFAULT_CHAT_MODEL;
    body.embeddingModel = body.embeddingModel || DEFAULT_EMBEDDING_MODEL;
    body.history = body.history || [];
    body.optimizationMode = body.optimizationMode || 'balanced';

    // Convert conversation history
    const history: BaseMessage[] = body.history.map(([role, content]) =>
      role === 'human'
        ? new HumanMessage({ content })
        : new AIMessage({ content })
    );

    // Load Model Providers
    const [chatModelProviders, embeddingModelProviders] = await Promise.all([
      getAvailableChatModelProviders(),
      getAvailableEmbeddingModelProviders(),
    ]);

    // Assign Model Providers
    const chatModelProvider = body.chatModel.provider;
    const chatModel = body.chatModel.model;
    const embeddingModelProvider = body.embeddingModel.provider;
    const embeddingModel = body.embeddingModel.model;

    let llm: BaseChatModel | undefined;
    let embeddings: Embeddings | undefined;

    // Custom OpenAI with Authorization Header
    if (chatModelProvider === 'custom_openai') {
      if (!body.chatModel.customOpenAIBaseURL) {
        return res.status(400).json({ message: 'Missing custom OpenAI base URL' });
      }

      llm = new ChatOpenAI({
        modelName: chatModel,
        openAIApiKey: bearerToken, // Use token from request header
        temperature: 0.7,
        configuration: {
          baseURL: body.chatModel.customOpenAIBaseURL,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      }) as unknown as BaseChatModel;
    } 
    // Standard Model from Providers
    else if (chatModelProviders[chatModelProvider] && chatModelProviders[chatModelProvider][chatModel]) {
      llm = chatModelProviders[chatModelProvider][chatModel].model as BaseChatModel | undefined;
    }

    // Fetch Embeddings
    if (embeddingModelProviders[embeddingModelProvider] && embeddingModelProviders[embeddingModelProvider][embeddingModel]) {
      embeddings = embeddingModelProviders[embeddingModelProvider][embeddingModel].model as Embeddings | undefined;
    }

    // If No LLM or Embeddings Found
    if (!llm || !embeddings) {
      return res.status(400).json({ message: 'Invalid model selected' });
    }

    // Get Search Handler
    const searchHandler = searchHandlers[body.focusMode];
    if (!searchHandler) {
      return res.status(400).json({ message: 'Invalid focus mode' });
    }

    // Invoke LLM Using EventEmitter
    const emitter = searchHandler(body.query, history, llm, embeddings, body.optimizationMode);

    let message = '';
    let sources: any[] = [];

    emitter.on('data', (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'response') {
        message += parsedData.data;
      } else if (parsedData.type === 'sources') {
        sources = parsedData.data;
      }
    });

    emitter.on('end', () => {
      res.status(200).json({ message, sources });
    });

    emitter.on('error', (data) => {
      const parsedData = JSON.parse(data);
      res.status(500).json({ message: parsedData.data });
    });

  } catch (err: any) {
    logger.error(`Error in chat response: ${err.message}`);
    res.status(500).json({ message: 'An error has occurred.' });
  }
});

export default router;

*/
