"use client"

import { useEffect, useState } from "react"
import { BinData } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function AdminBinsPage() {
  const [bins, setBins] = useState<BinData[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    lat: "",
    lng: "",
    address: "",
  })

  useEffect(() => {
    fetch("/api/bins")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setBins(data))
  }, [])

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
      const newBin = await res.json()
      setBins((prev) => [...prev, newBin])
      setShowForm(false)
      setForm({ name: "", lat: "", lng: "", address: "" })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Xoá thùng rác này?")) return
    const res = await fetch(`/api/bins/${id}`, { method: "DELETE" })
    if (res.ok) {
      setBins((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý thùng rác
          </h1>
          <p className="text-sm text-gray-500">{bins.length} thùng rác</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hủy" : "+ Thêm thùng rác"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              <Input
                label="Tên thùng rác"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Địa chỉ"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
              <Input
                label="Vĩ độ (Lat)"
                type="number"
                step="any"
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                required
              />
              <Input
                label="Kinh độ (Lng)"
                type="number"
                step="any"
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                required
              />
              <div className="col-span-2">
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {bins.map((bin) => (
          <Card key={bin.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {bin.name}
                    </h3>
                    {bin.latestSensor &&
                      (bin.latestSensor.co2 > 1000 ||
                        bin.latestSensor.methane > 500) && (
                        <Badge variant="danger">Cảnh báo</Badge>
                      )}
                  </div>
                  <p className="text-sm text-gray-500">{bin.address}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {bin.lat}, {bin.lng}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {bin.latestSensor && (
                    <div className="text-right text-sm">
                      <p>
                        CO₂:{" "}
                        <strong>{bin.latestSensor.co2} ppm</strong>
                      </p>
                      <p>
                        CH₄:{" "}
                        <strong>{bin.latestSensor.methane} ppm</strong>
                      </p>
                    </div>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(bin.id)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
