
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from "@/public/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const generateSummaryFromGemini =async (pdfText:string)=>{


  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: "SUMMARY_SYSTEM_PROMPT" }],
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Transform this document into an engaging, easy-to-read summary " +
                "with contextually relevant emojis and proper markdown formatting:\n\n" +
                pdfText,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    return result.response.text();
  } catch (err: any) {
    // Google returns 429 for quota/rate-limit issues
    if (err?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw err;
  }
}
