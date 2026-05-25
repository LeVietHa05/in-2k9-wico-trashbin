import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12)
  const userPassword = await bcrypt.hash("user123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@ecobin.com" },
    update: {},
    create: {
      email: "admin@ecobin.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { email: "user@ecobin.com" },
    update: {},
    create: {
      email: "user@ecobin.com",
      name: "Nguyễn Văn A",
      password: userPassword,
      role: "USER",
    },
  })

  const bin1 = await prisma.bin.upsert({
    where: { id: "bin-1" },
    update: {},
    create: {
      id: "bin-1",
      name: "Thùng rác Công viên Lê Văn Tám",
      lat: 10.7769,
      lng: 106.6953,
      address: "Công viên Lê Văn Tám, Quận 1, TP.HCM",
      userId: admin.id,
    },
  })

  const bin2 = await prisma.bin.upsert({
    where: { id: "bin-2" },
    update: {},
    create: {
      id: "bin-2",
      name: "Thùng rác Chợ Bến Thành",
      lat: 10.7726,
      lng: 106.6984,
      address: "Chợ Bến Thành, Quận 1, TP.HCM",
      userId: admin.id,
    },
  })

  const bin3 = await prisma.bin.upsert({
    where: { id: "bin-3" },
    update: {},
    create: {
      id: "bin-3",
      name: "Thùng rác Nhà thờ Đức Bà",
      lat: 10.7797,
      lng: 106.6991,
      address: "Nhà thờ Đức Bà, Quận 1, TP.HCM",
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
      message: "Cảnh báo! Thùng rác Chợ Bến Thành: CO₂ (1200ppm) và Metan (600ppm) vượt ngưỡng!",
    },
  })

  await prisma.alert.create({
    data: {
      binId: bin3.id,
      userId: admin.id,
      type: "HIGH_CO2",
      message: "Cảnh báo! Thùng rác Nhà thờ Đức Bà: CO₂ (450ppm) đang tăng cao!",
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
