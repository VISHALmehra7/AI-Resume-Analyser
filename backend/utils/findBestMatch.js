import cosineSimilarity from "compute-cosine-similarity";

export async function findBestMatch(chunks, questionEmbedding) {
  let bestScore = -1;
  let bestMatch = null;

  for (const chunk of chunks) {
    const score = cosineSimilarity(questionEmbedding, chunk.vector);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = chunk;
    }
  }

  return { bestMatch, score: bestScore };
}
