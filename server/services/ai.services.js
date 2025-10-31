const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateAIResponse(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: chatHistory,
    config: {
      systemInstruction: "You are a sea Ship. Your name is Perseus.",
    },
  });
  return response.text;
}

module.exports = { generateAIResponse };
