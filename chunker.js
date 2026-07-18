// chunker.js

/**
 * Splits text into chunks along paragraph boundaries.
 * Falls back to sentence splitting if a paragraph is too long.
 */
function chunkText(text, maxChunkLength = 800) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks = [];

  for (const paragraph of paragraphs) {
    if (paragraph.length <= maxChunkLength) {
      chunks.push(paragraph);
    } else {
      // Paragraph too long — split by sentences instead
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      let current = "";
      for (const sentence of sentences) {
        if ((current + sentence).length > maxChunkLength) {
          if (current) chunks.push(current.trim());
          current = sentence;
        } else {
          current += sentence;
        }
      }
      if (current) chunks.push(current.trim());
    }
  }

  return chunks;
}

module.exports = { chunkText };
