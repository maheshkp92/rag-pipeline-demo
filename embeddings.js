// embeddings.js
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small", // cheap, fast, good enough for most RAG use cases
    input: text,
  });
  return response.data[0].embedding; // an array of ~1536 numbers
}

module.exports = { getEmbedding };
