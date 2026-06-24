import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  const formatted = scans.map((s) => ({
    id: s.id,
    binId: s.binId,
    userId: s.userId,
    imageUrl: s.imageUrl,
    result: s.result as "Organic" | "Inorganic",
    confidence: s.confidence,
    createdAt: s.createdAt.toISOString(),
  }))

  return NextResponse.json(formatted)
}
