import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const bins = await prisma.bin.findMany({
    include: {
      sensors: {
        orderBy: { timestamp: "desc" },
        take: 1,
      },
      _count: {
        select: { alerts: true },
      },
    },
  })

  const formatted = bins.map((bin) => ({
    id: bin.id,
    name: bin.name,
    lat: bin.lat,
    lng: bin.lng,
    address: bin.address,
    userId: bin.userId,
    createdAt: bin.createdAt.toISOString(),
    latestSensor: bin.sensors[0]
      ? {
        id: bin.sensors[0].id,
        binId: bin.sensors[0].binId,
        co2: bin.sensors[0].co2,
        methane: bin.sensors[0].methane,
        timestamp: bin.sensors[0].timestamp.toISOString(),
      }
      : null,
    alertCount: bin._count.alerts,
  }))

  return NextResponse.json(formatted)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, lat, lng, address, userId } = body

  if (!name || lat === undefined || lng === undefined || !address || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const bin = await prisma.bin.create({
    data: {
      name,
      lat,
      lng,
      address,
      userId,
    },
  })

  return NextResponse.json(bin, { status: 201 })
}
