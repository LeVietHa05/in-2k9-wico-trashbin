import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { classifyWaste } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File
    let userId = formData.get("userId") as string

    if (!userId) userId = "test"
    
    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    const result = await classifyWaste(base64)

    const scan = await prisma.scan.create({
      data: {
        userId,
        imageUrl: `data:${file.type};base64,${base64}`,
        result: result.type,
        confidence: result.confidence,
      },
    })

    return NextResponse.json({
      id: scan.id,
      result: result.type,
      confidence: result.confidence,
      createdAt: scan.createdAt.toISOString(),
    })
  } catch (error: unknown) {
    console.error("Scan error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to classify image" },
      { status: 500 }
    )
  }
}
