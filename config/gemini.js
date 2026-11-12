async function getGeminiClient() {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
        apiKey: process.env.Gemini_API_KEY
    });

    return ai;
}

module.exports = getGeminiClient;