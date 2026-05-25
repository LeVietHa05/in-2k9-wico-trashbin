"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { BinData, AlertData } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AlertBanner } from "@/components/sensors/AlertBanner"

const BinMap = dynamic(
  () => import("@/components/map/BinMap").then((m) => ({ default: m.BinMap })),
  { ssr: false }
)

export default function AdminDashboard() {
  const [bins, setBins] = useState<BinData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])

  useEffect(() => {
    fetch("/api/bins")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setBins(data))
    fetch("/api/alerts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setAlerts(data))
  }, [])

  const markRead = async (alertId: string) => {
    const res = await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alertId }),
    })
    if (res.ok) {
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
      )
    }
  }

  const markAllRead = async () => {
    const unread = alerts.filter((a) => !a.isRead)
    await Promise.all(unread.map((a) => markRead(a.id)))
  }

  const totalCo2 = bins.reduce(
    (sum, b) => sum + (b.latestSensor?.co2 ?? 0), 0
  )
  const totalMethane = bins.reduce(
    (sum, b) => sum + (b.latestSensor?.methane ?? 0), 0
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Tổng quan hệ thống thùng rác thông minh
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tổng thùng rác</p>
            <p className="text-2xl font-bold">{bins.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Cảnh báo chưa đọc</p>
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter((a) => !a.isRead).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">CO₂ trung bình</p>
            <p className="text-2xl font-bold">
              {bins.length > 0 ? (totalCo2 / bins.length).toFixed(0) : 0} ppm
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Metan trung bình</p>
            <p className="text-2xl font-bold">
              {bins.length > 0 ? (totalMethane / bins.length).toFixed(0) : 0} ppm
            </p>
          </CardContent>
        </Card>
      </div>

      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">
              Cảnh báo gần đây
            </h2>
          </CardHeader>
          <CardContent>
            <AlertBanner alerts={alerts} onMarkRead={markRead} onMarkAllRead={markAllRead} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">
            Bản đồ các thùng rác
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[450px]">
            <BinMap bins={bins} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
