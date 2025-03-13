import { encoding_for_model } from "tiktoken"; // OpenAI Tokenizer

const enc = encoding_for_model("gpt-4o"); // Change based on model used

export const countTokens = (text: string) => enc.encode(text).length;

export const estimateTotalTokens = ({
  query,
  chat_history,
  docs,
  model,
}: {
  query: string;
  chat_history: string[];
  docs: Document[];
  model: string;
}) => {
  let totalTokens = 547+623;

  // 🔹 Fixed Prompt Token Costs
//   const promptTokens = {
//     basicSearchRetrieverPrompt: 100, // Estimate
//     basicWebSearchResponsePrompt: 150, // Estimate
//   };

//   totalTokens += promptTokens["basicSearchRetrieverPrompt"];
//   totalTokens += promptTokens["basicWebSearchResponsePrompt"];

  // 🔹 Query Token Count
  totalTokens += countTokens(query);

  // 🔹 Chat History Token Count (Optional)
  chat_history.forEach((msg) => {
    totalTokens += countTokens(msg);
  });

//   // 🔹 Document Tokens (Reranked Docs Only)
//   docs.forEach((doc) => {
//     totalTokens += countTokens(doc.pageContent);
//   });

  // 🔹 Estimated Output Tokens
  const estimatedOutputTokens = 300; // Example estimate
  totalTokens += estimatedOutputTokens;

  console.log(`[Token Count] Model: ${model}, Total Tokens: ${totalTokens}`);
  return totalTokens;
};

