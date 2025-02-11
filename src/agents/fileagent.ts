import { EventEmitter } from "events";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { BaseMessage } from "@langchain/core/messages";
import { Document } from "langchain/document";
import computeSimilarity from '../utils/computeSimilarity';
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Embeddings } from "@langchain/core/embeddings";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";


function truncateString(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// --- Helper: Load File Data (Extracted Text and Embeddings) ---
async function loadFileData(fileId: string): Promise<{
    fileName: string;
    contents: string[];
    embeddings: number[][];
    title: string;
}> {
    // Construct paths to the extracted JSON and embeddings JSON
    const basePath = path.join(process.cwd(), "uploads", fileId);
    const contentPath = `${basePath}-extracted.json`;
    const embeddingsPath = `${basePath}-embeddings.json`;

    if (!fs.existsSync(contentPath)) {
        throw new Error(`Extracted JSON not found for fileId ${fileId}`);
    }
    if (!fs.existsSync(embeddingsPath)) {
        throw new Error(`Embeddings JSON not found for fileId ${fileId}`);
    }

    const contentData = JSON.parse(fs.readFileSync(contentPath, "utf8"));
    const embeddingsData = JSON.parse(fs.readFileSync(embeddingsPath, "utf8"));

    if (!Array.isArray(contentData.contents) || !Array.isArray(embeddingsData.embeddings)) {
        throw new Error("Invalid JSON structure for extracted content or embeddings");
    }

    return {
        fileName: contentData.title, // Or use contentData.title if available
        contents: contentData.contents,
        embeddings: embeddingsData.embeddings,
        title: contentData.title,
    };
}


function processSourceChunks(chunks: Array<{ content: string; fileName: string; index: number }>) {
    return chunks
        .map((chunk, idx) => `${idx + 1}. ${chunk.content}`)
        .join('\n\n');
}

// // --- Helper: Given a query and an array of file IDs, select relevant chunks ---
// function getRelevantFileContext(
//     query: string,
//     fileIds: string[],
//     embeddingModel: Embeddings
// ): Promise<string> {
//     return Promise.all(fileIds.map((id) => loadFileData(id))).then((filesDataArr) => {
//         // Flatten the data: for each file, map its chunks into an object array
//         const filesData = filesDataArr
//             .map((fileData) =>
//                 fileData.contents.map((chunk: string, i: number) => ({
//                     fileName: fileData.title,
//                     content: chunk,
//                     embeddings: fileData.embeddings[i],
//                 }))
//             )
//             .flat();

//         // Embed the query using the embedding model
//         return embeddingModel.embedQuery(query).then((queryEmbedding) => {
//             // Compute similarity for each chunk
//             const similarityResults = filesData.map((data, index) => {
//                 const sim = computeSimilarity(queryEmbedding, data.embeddings);
//                 return { index, similarity: sim };
//             });

//             // Filter, sort, and select top chunks
//             const threshold = 0.3;
//             const sortedResults = similarityResults
//                 .filter((r) => r.similarity > threshold)
//                 .sort((a, b) => b.similarity - a.similarity)
//                 .slice(0, 8);

//             // Get the corresponding text chunks
//             const relevantChunks = sortedResults.map((r) => filesData[r.index].content);
//             return relevantChunks.join("\n\n");
//         });
//     });
// }


// updated one
// --- Helper: Get Relevant File Context with Source Information ---
async function getRelevantFileContext(
  query: string,
  fileIds: string[],
  embeddingModel: Embeddings
): Promise<{ formattedContext: string; source: { content: string; fileName: string } }> {
  const filesDataArr = await Promise.all(fileIds.map((id) => loadFileData(id)));
  
  const filesData = filesDataArr
      .map((fileData) =>
          fileData.contents.map((chunk: string, i: number) => ({
              fileName: fileData.title,
              content: chunk,
              embeddings: fileData.embeddings[i],
          }))
      )
      .flat();

  const queryEmbedding = await embeddingModel.embedQuery(query);
  
  const similarityResults = filesData.map((data, index) => ({
      index,
      similarity: computeSimilarity(queryEmbedding, data.embeddings),
      content: data.content,
      fileName: data.fileName
  }));

  const threshold = 0.3;
  const sortedResults = similarityResults
      .filter((r) => r.similarity > threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 8);

  const relevantChunks = sortedResults.map((r, idx) => ({
      content: r.content,
      fileName: r.fileName,
      index: idx + 1
  }));

  // Get the first file as the primary source
  const primarySource = {
      fileName: relevantChunks[0].fileName,
      content: "Source Document"
  };

  return {
      formattedContext: processSourceChunks(relevantChunks),
      source: primarySource
  };
}


// --- Create a File-Only Chain ---
const createFileOnlyChain = (llm: BaseChatModel) => {
    const fileOnlyPrompt = `
  You are PotatoAI, a highly skilled document analysis assistant. You have been provided with the complete extracted text of an uploaded file. Your task is to carefully review the content below and answer the user's query using only the information in the file. Do not incorporate any external data or references.

File Content:
{file_context}

Conversation History:
{chat_history}

User Query:
{query}

Instructions:
- Base your answer exclusively on the file content provided above.
- Provide a concise, clear, and well-organized response that highlights the key points from the file.
- If the query asks for a summary (for example, "What is inside this file?"), offer a brief, structured overview using bullet points or numbered lists.
- Do not repeat long passages verbatim; instead, synthesize the information.
- Do not reference or rely on any information outside of the provided file content.

Your Answer:
`;
    const promptTemplate = ChatPromptTemplate.fromTemplate(fileOnlyPrompt);
    return RunnableSequence.from([
        promptTemplate,
        llm,
        new StringOutputParser(),
    ]).withConfig({ runName: "FileOnlyResponseGenerator" });
};

/**
 * Main function for file-only chat agent.
 * This function uses promise chaining (instead of async/await at the top level)
 * so that the file context is resolved before the chain is invoked.
 */

const handleFileOnlyChatAgent = (
    query: string,
    history: BaseMessage[],
    llm: BaseChatModel,
    embeddingModel: Embeddings,
    optimizationMode: "speed" | "balanced" | "quality",
    fileIds: string[]
): EventEmitter => {
    const emitter = new EventEmitter();

   
    // Chain the asynchronous operations
    // getRelevantFileContext(query, fileIds, embeddingModel)
    //     .then((fileContext) => {
    //         // console.log("Resolved file context:", fileContext);
    //         const fileChain = createFileOnlyChain(llm);
    //         const chainInput = {
    //             chat_history: history,
    //             query: query,
    //             file_context: fileContext,
    //         };

    getRelevantFileContext(query, fileIds, embeddingModel)
        .then(({ formattedContext, source }) => {
            const fileChain = createFileOnlyChain(llm);
            const chainInput = {
                chat_history: history,
                query: query,
                file_context: formattedContext,
            };

             // Define a maximum allowed length for the file title
            const MAX_TITLE_LENGTH = 20;
            const safeFileName = truncateString(source.fileName, MAX_TITLE_LENGTH);
            // console.log("Chain Input:", chainInput);
            // return fileChain.invoke(chainInput);

            // updated one
             // Emit only one source
             emitter.emit(
              "data",
              JSON.stringify({ 
                  type: "sources", 
                  data: [{
                      pageContent: source.content,
                      metadata: { 
                        title: safeFileName,
                        url: `File: ${safeFileName}`
                       
                      }
                  }]
              })
          );
          

          return fileChain.invoke(chainInput);

        })
        .then((result) => {
            let finalResponse: string | undefined;
            if (typeof result === "string") {
                finalResponse = result;
            } else if (result && (result as any).content) {
                finalResponse = (result as any).content;
            }
            if (finalResponse && finalResponse.length > 0) {
                emitter.emit("data", JSON.stringify({ type: "response", data: finalResponse }));
            } else {
                emitter.emit("error", JSON.stringify({ type: "error", data: "Empty response from LLM" }));
            }
            emitter.emit("end");
        })
        .catch((error) => {
            logger.error(`Error in file-only chat agent: ${error}`);
            emitter.emit(
                "error",
                JSON.stringify({ type: "error", data: "An error occurred during file-only chat processing" })
            );
            emitter.emit("end");
        });

    return emitter;
};

export default handleFileOnlyChatAgent;








// ... (previous code remains the same until after loadFileData function)

// async function selectRelevantChunks(
//     query: string,
//     fileData: {
//         contents: string[];
//         embeddings: number[][];
//     },
//     embeddingModel: Embeddings
// ): Promise<string[]> {
//     // First, we create an embedding for the user's query
//     const queryEmbedding = await embeddingModel.embedQuery(query);

//     // Calculate similarity scores for each chunk in the document
//     const chunkSimilarities = fileData.embeddings.map((chunkEmbedding, index) => ({
//         index,
//         similarity: computeSimilarity(queryEmbedding, chunkEmbedding),
//         content: fileData.contents[index]
//     }));

//     // Sort chunks by similarity and select the most relevant ones
//     const sortedChunks = chunkSimilarities
//         .sort((a, b) => b.similarity - a.similarity)  // Sort by highest similarity first
//         .filter(chunk => chunk.similarity > 0.3);     // Filter out low-relevance chunks

//     // Select top chunks while maintaining document coherence
//     const selectedChunks = new Set<number>();
//     const finalChunks: string[] = [];
    
//     // First, add the most relevant chunks
//     for (const chunk of sortedChunks.slice(0, 3)) {
//         selectedChunks.add(chunk.index);
//         finalChunks.push(chunk.content);

//         // Add surrounding context (one chunk before and after) if available
//         const surroundingIndices = [chunk.index - 1, chunk.index + 1];
//         for (const idx of surroundingIndices) {
//             if (
//                 idx >= 0 && 
//                 idx < fileData.contents.length && 
//                 !selectedChunks.has(idx)
//             ) {
//                 selectedChunks.add(idx);
//                 finalChunks.push(fileData.contents[idx]);
//             }
//         }
//     }

//     // Sort chunks by their original order in the document to maintain coherence
//     return Array.from(selectedChunks)
//         .sort((a, b) => a - b)
//         .map(index => fileData.contents[index]);
// }

// // ... (rest of the previous code remains the same)
// // Helper function to analyze file relevance to the query
// async function analyzeFileRelevance(
//     query: string,
//     filesData: Array<{
//         fileName: string;
//         title: string;
//         contents: string[];
//         embeddings: number[][];
//     }>,
//     embeddingModel: Embeddings
// ): Promise<Array<{ fileId: string; relevance: number; title: string }>> {
//     const queryEmbedding = await embeddingModel.embedQuery(query);
    
//     return filesData.map(fileData => {
//         // Compare query embedding with first paragraph of each file
//         const firstChunkSimilarity = computeSimilarity(queryEmbedding, fileData.embeddings[0]);
//         return {
//             fileId: fileData.fileName,
//             relevance: firstChunkSimilarity,
//             title: fileData.title
//         };
//     });
// }

// // Enhanced file context selection
// async function getRelevantFileContext(
//     query: string,
//     fileIds: string[],
//     embeddingModel: Embeddings,
//     specificFile?: string
// ): Promise<{ context: string; fileInfo: { files: string[]; needsClarification: boolean } }> {
//     const filesData = await Promise.all(fileIds.map(id => loadFileData(id)));
    
//     // If a specific file is requested, only use that file
//     if (specificFile) {
//         const fileData = filesData.find(f => f.title.toLowerCase().includes(specificFile.toLowerCase()));
//         if (fileData) {
//             const relevantChunks = await selectRelevantChunks(query, fileData, embeddingModel);
//             return {
//                 context: relevantChunks.join("\n\n"),
//                 fileInfo: { files: [fileData.title], needsClarification: false }
//             };
//         }
//     }

//     // Analyze query to determine if it's file-specific or general
//     const fileRelevance = await analyzeFileRelevance(query, filesData, embeddingModel);
//     const highlyRelevantFiles = fileRelevance.filter(f => f.relevance > 0.6);

//     // If query seems general and multiple files are relevant, suggest clarification
//     if (highlyRelevantFiles.length > 1 && isGeneralQuery(query)) {
//         return {
//             context: createFileOverview(filesData),
//             fileInfo: {
//                 files: filesData.map(f => f.title),
//                 needsClarification: true
//             }
//         };
//     }

//     // Use most relevant files
//     const relevantFiles = fileRelevance
//         .sort((a, b) => b.relevance - a.relevance)
//         .slice(0, 2);

//     const relevantContent = await Promise.all(
//         relevantFiles.map(async file => {
//             const fileData = filesData.find(f => f.fileName === file.fileId);
//             if (!fileData) return "";
//             const chunks = await selectRelevantChunks(query, fileData, embeddingModel);
//             return chunks.join("\n\n");
//         })
//     );

//     return {
//         context: relevantContent.join("\n\n"),
//         fileInfo: {
//             files: relevantFiles.map(f => f.title),
//             needsClarification: false
//         }
//     };
// }

// // Helper to check if query is general
// function isGeneralQuery(query: string): boolean {
//     const generalKeywords = [
//         'what', 'tell me about', 'explain', 'show', 'contain',
//         'overview', 'summary', 'content', 'inside'
//     ];
//     return generalKeywords.some(keyword => 
//         query.toLowerCase().includes(keyword.toLowerCase())
//     );
// }

// // Helper to create file overview
// function createFileOverview(filesData: Array<any>): string {
//     return filesData.map(file => 
//         `${file.title}:\n${file.contents[0].substring(0, 200)}...`
//     ).join('\n\n');
// }

// // Enhanced prompt template for file selection
// const createFileOnlyChain = (llm: BaseChatModel) => {
//     const fileOnlyPrompt = `
// You are PotatoAI, a highly knowledgeable document analysis assistant. You have access to multiple documents uploaded by the user.

// File Information:
// {file_info}

// File Content:
// {file_context}

// Conversation History:
// {chat_history}

// User Query:
// {query}

// Instructions:
// 1. If the file_info indicates clarification is needed, politely ask the user which specific document they'd like to learn about.
// 2. If a specific file is being discussed, focus your response on that document's content.
// 3. For general queries about file content, provide an overview and suggest specific documents for more details.
// 4. Always be explicit about which document(s) you're referring to in your response.

// Please provide a clear, well-organized response that accurately reflects the document content while maintaining context awareness.
// `;
//     const promptTemplate = ChatPromptTemplate.fromTemplate(fileOnlyPrompt);
//     return RunnableSequence.from([
//         promptTemplate,
//         llm,
//         new StringOutputParser(),
//     ]).withConfig({ runName: "FileOnlyResponseGenerator" });
// };

// // Enhanced main handler function
// const handleFileOnlyChatAgent = (
//     query: string,
//     history: BaseMessage[],
//     llm: BaseChatModel,
//     embeddingModel: Embeddings,
//     optimizationMode: "speed" | "balanced" | "quality",
//     fileIds: string[]
// ): EventEmitter => {
//     const emitter = new EventEmitter();

//     // Extract specific file reference from query if it exists
//     const specificFile = extractFileReference(query, history);

//     getRelevantFileContext(query, fileIds, embeddingModel, specificFile)
//         .then(({ context, fileInfo }) => {
//             const fileChain = createFileOnlyChain(llm);
//             const chainInput = {
//                 chat_history: history,
//                 query: query,
//                 file_context: context,
//                 file_info: JSON.stringify(fileInfo)
//             };
//             return fileChain.invoke(chainInput);
//         })
//         .then((result) => {
//             let finalResponse = typeof result === "string" ? result : (result as any).content;
//             if (finalResponse && finalResponse.length > 0) {
//                 emitter.emit("data", JSON.stringify({ type: "response", data: finalResponse }));
//             } else {
//                 emitter.emit("error", JSON.stringify({ type: "error", data: "Empty response from LLM" }));
//             }
//             emitter.emit("end");
//         })
//         .catch((error) => {
//             logger.error(`Error in file-only chat agent: ${error}`);
//             emitter.emit(
//                 "error",
//                 JSON.stringify({ type: "error", data: "An error occurred during file-only chat processing" })
//             );
//             emitter.emit("end");
//         });

//     return emitter;
// };

// // Helper to extract file references from query and history
// function extractFileReference(query: string, history: BaseMessage[]): string | undefined {
//     // Look for explicit file mentions in the query
//     const queryWords = query.toLowerCase().split(' ');
//     if (queryWords.includes('report') || queryWords.includes('document')) {
//         const nextWord = queryWords[queryWords.indexOf('report') + 1] || queryWords[queryWords.indexOf('document') + 1];
//         if (nextWord) return nextWord;
//     }

//     // Check recent history for file context
//     const recentMessages = history.slice(-3);
//     for (const message of recentMessages) {
//         if (message.content.toString().toLowerCase().includes('report') || 
//             message.content.toString().toLowerCase().includes('document')) {
//             const words = message.content.toString().toLowerCase().split(' ');
//             const index = words.findIndex(w => w === 'report' || w === 'document');
//             if (index >= 0 && words[index + 1]) return words[index + 1];
//         }
//     }

//     return undefined;
// }

// export default handleFileOnlyChatAgent;