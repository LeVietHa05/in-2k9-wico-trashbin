"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import { BinData, AlertData } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GasGauge } from "@/components/sensors/GasGauge"
import { AlertBanner } from "@/components/sensors/AlertBanner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const BinMap = dynamic(
  () => import("@/components/map/BinMap").then((m) => ({ default: m.BinMap })),
  { ssr: false }
)

const BinDetail = dynamic(
  () => import("@/components/sensors/BinDetail").then((m) => ({ default: m.BinDetail })),
  { ssr: false }
)

const LocationPicker = dynamic(
  () =>
    import("@/components/map/LocationPicker").then((m) => ({
      default: m.LocationPicker,
    })),
  { ssr: false }
)

export default function UserDashboard() {
  const { data: session } = useSession()
  const [bins, setBins] = useState<BinData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedBinId, setSelectedBinId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", lat: "", lng: "", address: "" })

  const loadData = () => {
    fetch("/api/bins")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setBins(data))
    fetch("/api/alerts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setAlerts(data))
  }

  useEffect(loadData, [])

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

  const handleLocationSelect = (lat: number, lng: number) => {
    setForm((prev) => ({ ...prev, lat: lat.toString(), lng: lng.toString() }))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/bins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        address: form.address,
      }),
    })
    if (res.ok) {
      setShowForm(false)
      setForm({ name: "", lat: "", lng: "", address: "" })
      loadData()
    }
  }

  const allCo2 = bins.reduce(
    (sum, b) => sum + (b.latestSensor?.co2 ?? 0),
    0
  )
  const allMethane = bins.reduce(
    (sum, b) => sum + (b.latestSensor?.methane ?? 0),
    0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
          <p className="text-sm text-gray-500">
            Chào mừng, {session?.user?.name}
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="secondary">
          {showForm ? "Hủy" : "+ Thêm thùng rác"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Tên thùng rác" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Địa chỉ" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              </div>
              <LocationPicker
                lat={form.lat ? parseFloat(form.lat) : null}
                lng={form.lng ? parseFloat(form.lng) : null}
                onLocationSelect={handleLocationSelect}
              />
              <div className="flex gap-2 text-sm text-gray-500">
                <span>📍 {form.lat || "---"}, {form.lng || "---"}</span>
              </div>
              <Button type="submit">Lưu</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">
              Cảnh báo mới
            </h2>
          </CardHeader>
          <CardContent>
            <AlertBanner alerts={alerts} onMarkRead={markRead} onMarkAllRead={markAllRead} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Bản đồ thùng rác
                </h2>
                {selectedBinId && (
                  <button
                    onClick={() => setSelectedBinId(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[350px]">
                <BinMap
                  bins={bins}
                  selectedId={selectedBinId}
                  onBinSelect={(bin) =>
                    setSelectedBinId(bin ? bin.id : null)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {selectedBinId && (
            <BinDetail
              binId={selectedBinId}
              onClose={() => setSelectedBinId(null)}
            />
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">
                Chỉ số khí tổng hợp
              </h2>
            </CardHeader>
            <CardContent>
              <GasGauge co2={allCo2} methane={allMethane} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">
                Thống kê
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tổng thùng rác</span>
                  <span className="font-bold text-lg">{bins.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cảnh báo chưa đọc</span>
                  <span className="font-bold text-lg text-red-600">
                    {alerts.filter((a) => !a.isRead).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CO₂ trung bình</span>
                  <span className="font-bold text-lg">
                    {bins.length > 0
                      ? (allCo2 / bins.length).toFixed(0)
                      : 0}{" "}
                    ppm
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
