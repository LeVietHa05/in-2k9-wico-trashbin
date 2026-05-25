import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const bin = await prisma.bin.findUnique({
    where: { id },
    include: {
      sensors: {
        orderBy: { timestamp: "desc" },
        take: 20,
      },
      alerts: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  })

  if (!bin) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(bin)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const bin = await prisma.bin.update({
    where: { id },
    data: {
      name: body.name,
      address: body.address,
      lat: body.lat,
      lng: body.lng,
    },
  })

  return NextResponse.json(bin)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await prisma.bin.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
