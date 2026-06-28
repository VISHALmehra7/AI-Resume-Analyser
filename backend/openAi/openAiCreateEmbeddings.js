import openAiClient from "./openAIConfig.js";

export async function createEmbeddings(data) {
  const response = await openAiClient.embeddings.create({
    model: "text-embedding-3-small",
    input: data,
    encoding_format: "float",
  });

  return response.data[0].embedding
}