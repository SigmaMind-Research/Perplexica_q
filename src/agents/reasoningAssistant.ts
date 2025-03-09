// src/handleReasoningAgent.ts  

import { EventEmitter } from "events";
// import { BaseMessage } from "@langchain/core/messages";
import { BaseMessage, SystemMessage, HumanMessage } from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Embeddings } from "@langchain/core/embeddings";
// import { loadAzureDeepSeekModels } from "../lib/providers/deepseek"
import axios from "axios";
import { getAzureOpenaiNewKey, getAzureEndpoint } from '../config';


const AZURE_API_KEY = getAzureOpenaiNewKey();; // Replace with your actual key
const AZURE_ENDPOINT = 'https://potatoai-deepseek.eastus2.models.ai.azure.com/chat/completions';

// Define the prompt template
const reasoningPrompt = new PromptTemplate({
  template: `You are an advanced reasoning agent. Your task is to provide clear, well-structured, and insightful responses.
  Consider previous context and reason step-by-step when needed.
  
  Conversation History:
  {history}

  User Query: {query}
  
  Provide the best possible answer.`,
  inputVariables: ["history", "query"],
});
/**  
 * Handles user queries by invoking the LLM and emitting responses via EventEmitter.  
 *  
 * @param query - The user query string.  
 * @param history - An array of BaseMessage representing the conversation history.  
 * @param llm - An instance of BaseChatModel to interact with the language model.  
 * @param embeddings - An instance of Embeddings (currently not used).  
 * @returns An EventEmitter that emits 'data', 'error', and 'end' events.  
 */
const handleReasoningAgent = (
  query: string,
  history: BaseMessage[],
  llm: BaseChatModel,
  embeddings: Embeddings // Currently not used, but kept for future enhancements  
): EventEmitter => {
  const emitter = new EventEmitter();
  // Asynchronous function to handle the LLM invocation  
  const processQuery = async () => {
    try {
      if (!query || query.trim().length === 0) {
        emitter.emit("error", JSON.stringify({ type: "error", data: "Empty query received." }));
        emitter.emit("end");
        return;
      }

      // Check if the model is DeepSeek by inspecting llm.lc_kwargs.modelName
      const isDeepSeek = llm.lc_kwargs?.modelName === "potatoai-deepseek";

      // if (isDeepSeek) {
        const formattedPrompt = await reasoningPrompt.format({ history, query });

        // DeepSeek API request
        const requestBody = {
          model: "potatoai-deepseek",
          messages: [
            { role: "system", content: formattedPrompt },
            { role: "user", content: query },
          ],
          stream: false,
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AZURE_API_KEY}`,
        };

        const response = await axios.post(AZURE_ENDPOINT, requestBody, { headers });

        // Handle response chunking
        if (response?.data?.choices?.[0]?.message?.content) {
          const content = response.data.choices[0].message.content;
          const chunkSize = 100; // Define the size of each chunk (adjust as needed)

          for (let i = 0; i < content.length; i += chunkSize) {
            const chunk = content.slice(i, i + chunkSize);

            // Emit each chunk as a separate data event
            emitter.emit("data", JSON.stringify({ type: "response", data: chunk }));

            // Optional: Introduce a small delay to simulate streaming
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        } else {
          emitter.emit("error", JSON.stringify({ type: "error", data: "Empty response from LLM" }));
        }
      // } else {
      //   // Use LLM directly for other models (without system prompt)
      //   const responseData = await llm.invoke(query);

      //   if (responseData) {
      //     const chunkSize = 100; // Define chunk size
      //     for (let i = 0; i < responseData.content.length; i += chunkSize) {
      //       const chunk = responseData.content.slice(i, i + chunkSize);
      //       emitter.emit("data", JSON.stringify({ type: "response", data: chunk }));
      //       await new Promise((resolve) => setTimeout(resolve, 50));
      //     }
      //   } else {
      //     emitter.emit("error", JSON.stringify({ type: "error", data: "Empty response from LLM." }));
      //   }
      // }

      emitter.emit("end");
    } catch (error) {
      emitter.emit("error", JSON.stringify({ type: "error", data: `Error in reasoning agent: ${error.message}` }));
      emitter.emit("end");
    }
  };

  processQuery();
  return emitter;
};

export default handleReasoningAgent;