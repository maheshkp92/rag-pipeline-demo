// vectorStore.js

// In production, this data would live in MongoDB Atlas Vector Search,
// Redis, Pinecone, or Azure AI Search instead of a plain array.
let store = []; // [{ id, text, embedding, metadata }]

function addToStore(id, text, embedding, metadata = {}) {
  store.push({ id, text, embedding, metadata });
}

// Cosine similarity: measures the "angle" between two vectors.
// 1 = identical meaning direction, 0 = unrelated, -1 = opposite.
function cosineSimilarity(a, b) {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function search(queryEmbedding, topK = 3) {
  const scored = store.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  scored.sort((a, b) => b.score - a.score); // highest similarity first
  return scored.slice(0, topK);
}

module.exports = { addToStore, search };
