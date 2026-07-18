// server.js
require("dotenv").config();
const express = require("express");
const { ingestDocument } = require("./ingest");
const { askQuestion } = require("./query");

const app = express();
app.use(express.json());

// Admin uploads a document
app.post("/documents", async (req, res) => {
  try {
    const { docId, text } = req.body;
    await ingestDocument(docId, text);
    res.json({ status: "ingested", docId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ingestion failed" });
  }
});

// User asks a question
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    const result = await askQuestion(question);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`RAG server running on port ${PORT}`));
