import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const user = await prisma.user.update({
    where: { id },
    data: { role: body.role },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  return NextResponse.json({
    ...user,
    createdAt: user.createdAt.toISOString(),
  })
}
