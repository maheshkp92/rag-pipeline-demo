// query.js
const OpenAI = require("openai");
const { getEmbedding } = require("./embeddings");
const { search } = require("./vectorStore");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function askQuestion(question) {
  // 1. RETRIEVE: embed the question, find relevant chunks
  const questionEmbedding = await getEmbedding(question);
  const relevantChunks = search(questionEmbedding, 3);

  console.log("Top matching chunks:");
  relevantChunks.forEach((c) =>
    console.log(`  [score: ${c.score.toFixed(3)}] ${c.text.slice(0, 80)}...`),
  );

  // 2. AUGMENT: build a prompt that includes the retrieved context
  const context = relevantChunks.map((c) => c.text).join("\n\n---\n\n");

  const prompt = `Answer the question using ONLY the context below. 
If the answer isn't in the context, say "I don't have enough information to answer that."

Context:
${context}

Question: ${question}

Answer:`;

  // 3. GENERATE: send to the LLM
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // a lighter/cheaper model — swap for a larger one if task needs deeper reasoning
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2, // low temperature = more factual, less "creative"
  });

  return {
    answer: completion.choices[0].message.content,
    sourceChunks: relevantChunks,
  };
}

module.exports = { askQuestion };
