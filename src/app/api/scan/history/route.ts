import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  const a = await requireAuth()
  if ("error" in a) return a.error

  const userId = a.user.id

  const scans = await prisma.scan.findMany({
    where: { userId },
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
