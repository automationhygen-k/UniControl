import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY_HERE" }); // Replace if you have one, or leave blank for now

export const generateSmartTypeContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a typing assistant. Output ONLY the text the user wants to type based on: "${prompt}"`,
    });
    return response.text?.trim() || "";
  } catch (error) { return ""; }
};

export const interpretVoiceCommand = async (transcript: string): Promise<{ action: string, text?: string }> => {
   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Map command to JSON: "TYPE" (with text), "ENTER", "BACKSPACE". Command: "${transcript}"`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { action: "ERROR" }; }
}
