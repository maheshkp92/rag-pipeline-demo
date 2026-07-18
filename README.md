# RAG Pipeline Demo

A simple Node.js retrieval-augmented generation (RAG) demo using OpenAI embeddings and chat completions.

## Overview

This project shows how to:

- split documents into paragraph/sentence chunks (`chunker.js`)
- generate text embeddings with OpenAI (`embeddings.js`)
- store and search embeddings in a local vector store (`vectorStore.js`)
- ingest documents into the store (`ingest.js`)
- answer questions using retrieved context and an LLM (`query.js`)

## Files

- `chunker.js` - chunk text by paragraph, falling back to sentence splitting when needed
- `embeddings.js` - generate embeddings using `text-embedding-3-small`
- `vectorStore.js` - simple in-memory vector store with cosine similarity search
- `ingest.js` - ingest document text, embed each chunk, and add it to the store
- `query.js` - embed a question, retrieve top matching chunks, and call OpenAI chat completion
- `server.js` - optional app server for running the demo

## Prerequisites

- Node.js 18+ installed
- An OpenAI API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Ingest a document

Use `ingest.js` to split and embed your document text, then store the chunks.

### Ask a question

Use `query.js` to embed a question, retrieve matching chunks, and generate an answer.

### Run the server

If `server.js` exposes endpoints for ingest/query, start it with:

```bash
node server.js
```

## Notes

- This demo uses an in-memory store; for production use a real vector database such as Pinecone, Redis, or MongoDB Atlas Vector Search.
- The prompt in `query.js` restricts the model to answer only from retrieved context.
- `gpt-4o-mini` is used as a lightweight chat model for generation.

## License

ISC
