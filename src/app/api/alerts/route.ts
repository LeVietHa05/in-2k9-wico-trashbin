import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const alerts = await prisma.alert.findMany({
    include: {
      bin: {
        select: { id: true, name: true, lat: true, lng: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  const formatted = alerts.map((a) => ({
    id: a.id,
    binId: a.binId,
    userId: a.userId,
    type: a.type,
    message: a.message,
    isRead: a.isRead,
    createdAt: a.createdAt.toISOString(),
    bin: a.bin,
  }))

  return NextResponse.json(formatted)
}

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { alertId } = body

  await prisma.alert.update({
    where: { id: alertId },
    data: { isRead: true },
  })

  return NextResponse.json({ success: true })
}
