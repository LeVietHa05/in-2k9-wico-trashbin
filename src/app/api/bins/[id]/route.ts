import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const bin = await prisma.bin.findUnique({
    where: { id },
    include: {
      sensors: {
        orderBy: { timestamp: "asc" },
        take: 50,
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
  const { id } = await params
  await prisma.bin.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
