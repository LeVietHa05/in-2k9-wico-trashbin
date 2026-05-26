import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function classifyWaste(imageBase64: string): Promise<{
  type: "Organic" | "Inorganic"
  confidence: number
}> {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `Classify the waste in this image as "Organic" (e.g. food scraps, leaves, fruit peels) or "Inorganic" (e.g. plastic, glass, metal, paper).
Return exact JSON with format: { "type": "Organic" | "Inorganic", "confidence": 0.95 }
Return only JSON, no other text.`

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64,
      },
    },
  ])

  const text = result.response.text()
  const cleaned = text.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned)
}
