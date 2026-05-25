import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function classifyWaste(imageBase64: string): Promise<{
  type: "Hữu cơ" | "Vô cơ"
  confidence: number
}> {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `Phân loại rác trong hình ảnh này là "Hữu cơ" (organic waste như thức ăn thừa, lá cây, vỏ trái cây) hay "Vô cơ" (inorganic waste như nhựa, thủy tinh, kim loại, giấy). 
Trả về JSON chính xác với format: { "type": "Hữu cơ" | "Vô cơ", "confidence": 0.95 }
Chỉ trả về JSON, không kèm bất kỳ text nào khác.`

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
