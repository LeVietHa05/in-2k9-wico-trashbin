import { PrismaClient } from "@prisma/client"
import { randomBytes } from "crypto"

const prisma = new PrismaClient()

async function main() {
  const placeholderPassword = randomBytes(32).toString("hex")

  const admin = await prisma.user.upsert({
    where: { email: "admin@ecobin.com" },
    update: {},
    create: {
      email: "admin@ecobin.com",
      name: "Admin",
      password: placeholderPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { email: "user@ecobin.com" },
    update: {},
    create: {
      email: "user@ecobin.com",
      name: "User",
      password: placeholderPassword,
      role: "USER",
    },
  })

  const bin1 = await prisma.bin.upsert({
    where: { id: "bin-1" },
    update: {},
    create: {
      id: "bin-1",
      name: "Le Van Tam Park Bin",
      lat: 10.7769,
      lng: 106.6953,
      address: "Le Van Tam Park, District 1, HCMC",
      userId: admin.id,
    },
  })

  const bin2 = await prisma.bin.upsert({
    where: { id: "bin-2" },
    update: {},
    create: {
      id: "bin-2",
      name: "Ben Thanh Market Bin",
      lat: 10.7726,
      lng: 106.6984,
      address: "Ben Thanh Market, District 1, HCMC",
      userId: admin.id,
    },
  })

  const bin3 = await prisma.bin.upsert({
    where: { id: "bin-3" },
    update: {},
    create: {
      id: "bin-3",
      name: "Notre-Dame Cathedral Bin",
      lat: 10.7797,
      lng: 106.6991,
      address: "Notre-Dame Cathedral, District 1, HCMC",
      userId: admin.id,
    },
  })

  await prisma.sensor.createMany({
    data: [
      { binId: bin1.id, co2: 350, methane: 120 },
      { binId: bin2.id, co2: 1200, methane: 600 },
      { binId: bin3.id, co2: 450, methane: 200 },
    ],
  })

  await prisma.alert.create({
    data: {
      binId: bin2.id,
      userId: admin.id,
      type: "BOTH",
      message: "Alert! Ben Thanh Market Bin: CO₂ (1200ppm) and Methane (600ppm) exceeded thresholds!",
    },
  })

  await prisma.alert.create({
    data: {
      binId: bin3.id,
      userId: admin.id,
      type: "HIGH_CO2",
      message: "Alert! Notre-Dame Cathedral Bin: CO₂ (450ppm) is rising!",
    },
  })

  console.log("Seed data created successfully!")
  console.log("Admin: admin@ecobin.com / admin123")
  console.log("User: user@ecobin.com / user123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
