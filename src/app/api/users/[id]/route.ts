import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
