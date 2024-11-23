// import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
// import { getOpenaiApiKey } from '../../config';
// import logger from '../../utils/logger';

// export const loadOpenAIChatModels = async () => {
//   const openAIApiKey = getOpenaiApiKey();

//   if (!openAIApiKey) return {};

//   try {
//     const chatModels = {
//       'gpt-3.5-turbo': {
//         displayName: 'GPT-3.5 Turbo',
//         model: new ChatOpenAI({
//           openAIApiKey,
//           modelName: 'gpt-3.5-turbo',
//           temperature: 0.7,
//         }),
//       },
//       'gpt-4': {
//         displayName: 'GPT-4',
//         model: new ChatOpenAI({
//           openAIApiKey,
//           modelName: 'gpt-4',
//           temperature: 0.7,
//         }),
//       },
//       'gpt-4-turbo': {
//         displayName: 'GPT-4 turbo',
//         model: new ChatOpenAI({
//           openAIApiKey,
//           modelName: 'gpt-4-turbo',
//           temperature: 0.7,
//         }),
//       },
//       'gpt-4o': {
//         displayName: 'GPT-4 omni',
//         model: new ChatOpenAI({
//           openAIApiKey,
//           modelName: 'gpt-4o',
//           temperature: 0.7,
//         }),
//       },
//       'gpt-4o-mini': {
//         displayName: 'GPT-4 omni mini',
//         model: new ChatOpenAI({
//           openAIApiKey,
//           modelName: 'gpt-4o-mini',
//           temperature: 0.7,
//         }),
//       },
//     };

//     return chatModels;
//   } catch (err) {
//     logger.error(`Error loading OpenAI models: ${err}`);
//     return {};
//   }
// };

// export const loadOpenAIEmbeddingsModels = async () => {
//   const openAIApiKey = getOpenaiApiKey();

//   if (!openAIApiKey) return {};

//   try {
//     const embeddingModels = {
//       'text-embedding-3-small': {
//         displayName: 'Text Embedding 3 Small',
//         model: new OpenAIEmbeddings({
//           openAIApiKey,
//           modelName: 'text-embedding-3-small',
//         }),
//       },
//       'text-embedding-3-large': {
//         displayName: 'Text Embedding 3 Large',
//         model: new OpenAIEmbeddings({
//           openAIApiKey,
//           modelName: 'text-embedding-3-large',
//         }),
//       },
//     };

//     return embeddingModels;
//   } catch (err) {
//     logger.error(`Error loading OpenAI embeddings model: ${err}`);
//     return {};
//   }
// };




import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { getAzureApiKey, getAzureEndpoint } from '../../config'; // Updated to use Azure config
import logger from '../../utils/logger';

export const loadAzureOpenAIChatModels = async () => {
  const azureApiKey = getAzureApiKey();
  const azureEndpoint = getAzureEndpoint();

  if (!azureApiKey || !azureEndpoint) {
    logger.error('Azure API Key or Endpoint is missing.');
    return {};
  }

  try {
    const chatModels = {
      'gpt-3.5-turbo': {
        displayName: 'GPT-3.5 Turbo',
        model: new ChatOpenAI({
          azureOpenAIApiKey: azureApiKey,
          azureOpenAIEndpoint: azureEndpoint,
          deploymentName: 'gpt-3.5-turbo',
          temperature: 0.7,
        }),
      },
      'gpt-4': {
        displayName: 'GPT-4',
        model: new ChatOpenAI({
          azureOpenAIApiKey: azureApiKey,
          azureOpenAIEndpoint: azureEndpoint,
          deploymentName: 'gpt-4',
          temperature: 0.7,
        }),
      },
      // Add more models as necessary
    };

    logger.azureSuccess('Successfully loaded Azure OpenAI chat models.');
    return chatModels;
  } catch (err) {
    logger.azureError(`Error loading Azure OpenAI models: ${err}`);
    return {};
  }
};

export const loadAzureOpenAIEmbeddingsModels = async () => {
  const azureApiKey = getAzureApiKey();
  const azureEndpoint = getAzureEndpoint();

  if (!azureApiKey || !azureEndpoint) {
    logger.error('Azure API Key or Endpoint is missing.');
    return {};
  }

  try {
    const embeddingModels = {
      'text-embedding-3-small': {
        displayName: 'Text Embedding 3 Small',
        model: new OpenAIEmbeddings({
          azureOpenAIApiKey: azureApiKey,
          azureOpenAIEndpoint: azureEndpoint,
          deploymentName: 'text-embedding-3-small',
        }),
      },
      'text-embedding-3-large': {
        displayName: 'Text Embedding 3 Large',
        model: new OpenAIEmbeddings({
          azureOpenAIApiKey: azureApiKey,
          azureOpenAIEndpoint: azureEndpoint,
          deploymentName: 'text-embedding-3-large',
        }),
      },
    };

    logger.azureSuccess('Successfully loaded Azure OpenAI embeddings models.');
    return embeddingModels;
  } catch (err) {
    logger.azureError(`Error loading Azure OpenAI embeddings model: ${err}`);
    return {};
  }
};

