// ingest.js
const { chunkText } = require("./chunker");
const { getEmbedding } = require("./embeddings");
const { addToStore } = require("./vectorStore");

async function ingestDocument(docId, fullText) {
  const chunks = chunkText(fullText);
  console.log(`Split document into ${chunks.length} chunks`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await getEmbedding(chunk);
    addToStore(`${docId}-chunk-${i}`, chunk, embedding, {
      docId,
      chunkIndex: i,
    });
    console.log(`  Embedded and stored chunk ${i + 1}/${chunks.length}`);
  }
}

module.exports = { ingestDocument };
