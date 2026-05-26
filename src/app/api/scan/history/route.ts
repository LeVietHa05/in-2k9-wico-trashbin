import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user).id

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
