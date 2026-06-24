import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const formatted = users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }))

  return NextResponse.json(formatted)
}
