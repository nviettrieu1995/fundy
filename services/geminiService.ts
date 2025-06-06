
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment.
// In a Vite/CRA app, this would be import.meta.env.VITE_API_KEY or process.env.REACT_APP_API_KEY
// For this setup, we assume process.env.API_KEY is globally available or polyfilled.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found. Please set process.env.API_KEY.");
}

const TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
// const IMAGE_MODEL = 'imagen-3.0-generate-002'; // If image generation is needed

export const generateText = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "Gemini AI service is not initialized. API key missing.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text from Gemini:", error);
    // Consider more specific error handling based on GoogleGenAIError if needed
    return `Error: ${(error as Error).message}`;
  }
};

export const generateTextWithJsonOutput = async <T,>(prompt: string): Promise<T | string> => {
  if (!ai) {
    return "Gemini AI service is not initialized. API key missing.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    return JSON.parse(jsonStr) as T;

  } catch (error) {
    console.error("Error generating JSON from Gemini or parsing it:", error);
    return `Error: ${(error as Error).message}`;
  }
};

// Placeholder for future use, e.g., AI suggestions
export const getAISuggestion = async (context: string): Promise<string> => {
  if (!ai) {
    return "AI service not available.";
  }
  const prompt = `Based on the following context: "${context}", provide a concise business suggestion.`;
  return generateText(prompt);
};
    