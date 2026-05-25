import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { binId, co2, methane } = body

    if (!binId || co2 === undefined || methane === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: binId, co2, methane" },
        { status: 400 }
      )
    }

    const sensor = await prisma.sensor.create({
      data: { binId, co2, methane },
    })

    const co2Alert = co2 > 1000
    const methaneAlert = methane > 500

    if (co2Alert || methaneAlert) {
      const bin = await prisma.bin.findUnique({
        where: { id: binId },
        select: { userId: true, name: true },
      })

      let type = "HIGH_CO2"
      let message = `Cảnh báo! Thùng ${bin?.name}: CO2 (${co2}ppm) vượt ngưỡng!`

      if (co2Alert && methaneAlert) {
        type = "BOTH"
        message = `Cảnh báo! Thùng ${bin?.name}: CO2 (${co2}ppm) và Metan (${methane}ppm) vượt ngưỡng!`
      } else if (methaneAlert) {
        type = "HIGH_METHANE"
        message = `Cảnh báo! Thùng ${bin?.name}: Metan (${methane}ppm) vượt ngưỡng!`
      }

      await prisma.alert.create({
        data: {
          binId,
          userId: bin?.userId || "",
          type,
          message,
        },
      })
    }

    return NextResponse.json(sensor, { status: 201 })
  } catch (error: unknown) {
    console.error("Sensor error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save sensor data" },
      { status: 500 }
    )
  }
}
