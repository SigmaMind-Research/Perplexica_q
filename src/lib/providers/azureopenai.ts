// azureopenai.ts
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AzureChatOpenAI,OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from '@langchain/openai';
// import { AzureOpenAIEmbeddings } from '@langchain/azure-openai';

import { getAzureOpenaiApiKey, getAzureEndpoint } from '../../config';
import logger from '../../utils/logger';

const azureApiKey = getAzureOpenaiApiKey();
const azureEndpoint = getAzureEndpoint();

export const loadAzureOpenAIChatModels = async () => {
  if (!azureApiKey) return {};
  try {
    const chatModels = {
      'gpt-4o-mini': {
        displayName: 'Gpt-4o-mini',

        model: new AzureChatOpenAI({
          modelName:'gpt-4o-mini',
          openAIApiKey:azureApiKey,
          azureOpenAIApiInstanceName: "sigmamind-vision",
          openAIApiVersion:"2024-08-01-preview",
          deploymentName:'gpt-4o-mini',
          openAIBasePath:azureEndpoint
        })
      },
      'gpt-4o': {
        displayName: 'Gpt-4o',

        model: new AzureChatOpenAI({
          modelName:'gpt-4o',
          openAIApiKey:azureApiKey,
          azureOpenAIApiInstanceName: "sigmamind-vision",
          openAIApiVersion:"2024-08-01-preview",
          deploymentName:'gpt-4o',
          openAIBasePath:azureEndpoint
        })
      },
      //  'Phi-4-potato': {
      //           displayName: 'Phi4',
      //           model: new ChatOpenAI(
      //             {
      //               openAIApiKey:'YxKocelKPm03lI466KdMXuKWMfsqGbZG',
      //               modelName: 'Phi-4-potato',
      //               temperature: 0.7,
      //             },
      //             {
      //               baseURL: 'https://Phi-4-potato.eastus2.models.ai.azure.com',
      //             },
      //           ),
      //         },
      
      // Add more models if available
    };
    // console.log(chatModels);
    return chatModels;
  } catch (err) {
    logger.error(`Error loading Azure OpenAI models: ${err}`);
    return {};
  }
};

export const loadAzureOpenAIEmbeddingsModels = async () => {
  if (!azureApiKey) return {};

  try {
    const embeddingModels = {
      // 'text-embedding-3-large': {
        // displayName: 'text-large',
        // model: new AzureOpenAIEmbeddings({
          // azureOpenAIApiKey: azureApiKey,
          // azureOpenAIEndpoint: azureEndpoint,
          // azureOpenAIApiVersion: "2023-05-15",
          // azureOpenAIEmbeddingsApiDeploymentName: 'text-embedding-3-large'
        // }),
      // },
      // Add more models if available
        'text-embedding-3-large':{ 
        displayName:'text-large',
        model: new OpenAIEmbeddings({
          openAIApiKey:azureApiKey,
          azureOpenAIApiEmbeddingsDeploymentName:'text-embedding-3-large',
          azureOpenAIApiVersion:"2023-05-15",
          azureOpenAIBasePath:azureEndpoint,
        })
      }
    };
    // console.log(embeddingModels);
    return embeddingModels;
  } catch (err) {
    logger.error(`Error loading Azure OpenAI embeddings model: ${err}`);
    return {};
  }
};
