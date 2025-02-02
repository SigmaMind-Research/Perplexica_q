// src/handleReasoningAgent.ts  
  
import { EventEmitter } from "events";  
import { BaseMessage } from "@langchain/core/messages";  
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";  
import type { Embeddings } from "@langchain/core/embeddings";  
import logger from "../utils/logger";  
  
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
      // Validate the query  
      if (!query || query.trim().length === 0) {  
        emitter.emit(  
          "error",  
          JSON.stringify({ type: "error", data: "Empty query received." })  
        );  
        emitter.emit("end");  
        return;  
      }  
  
      /**  
       * Invoke the LLM with the constructed messages.  
       * The `invoke` method sends the messages to the language model and  
       * returns the response.  
       */  
      const response = await llm.invoke(query );  
  
      // Check if the response is valid and contains messages  
     /* if (response) {  
        // console.log(response)
        // Emit the LLM response back to the client  
        emitter.emit(  
          "data",  
          JSON.stringify({ type: "response", data: response.content})  
        );  
      } else {  
        // Emit an error if the LLM response is empty  
        emitter.emit(  
          "error",  
          JSON.stringify({ type: "error", data: "Empty response from LLM." })  
        );  
      }  
    } catch (error: any) {  
      // Log the error and emit an error message  
      logger.error(`Error in reasoning agent: ${error.message || error}`);  
      emitter.emit(  
        "error",  
        JSON.stringify({  
          type: "error",  
          data: "An error occurred while processing your request.",  
        })  
      );  
    } finally {  
      // Signal that processing has ended  
      emitter.emit("end");  
    }  
  };  
  
  // Start processing the query asynchronously  
  processQuery();  
  
  return emitter;  
};  
  
export default handleReasoningAgent;  */
if (response && response.content) {  
    const content = response.content;  
    const chunkSize = 100; // Define the size of each chunk (adjust as needed)  

    for (let i = 0; i < content.length; i += chunkSize) {  
      const chunk = content.slice(i, i + chunkSize);  
        
      // Emit each chunk as a separate data event  
      emitter.emit(  
        "data",  
        JSON.stringify({ type: "response", data: chunk })  
      );  

      // Optional: Introduce a small delay to simulate streaming  
      // This can be adjusted or removed based on your requirements  
      await new Promise(resolve => setTimeout(resolve, 50));  
    }  
  } else {  
    // Emit an error if the LLM response is empty  
    emitter.emit(  
      "error",  
      JSON.stringify({ type: "error", data: "Empty response from LLM." })  
    );  
  }  
} catch (error: any) {  
  // Log the error and emit an error message  
  logger.error(`Error in reasoning agent: ${error.message || error}`);  
  emitter.emit(  
    "error",  
    JSON.stringify({  
      type: "error",  
      data: "An error occurred while processing your request.",  
    })  
  );  
} finally {  
  // Signal that processing has ended  
  emitter.emit("end");  
}  
};  

// Start processing the query asynchronously  
processQuery();  

return emitter;  
};  

export default handleReasoningAgent;