"use client"

import { useEffect, useState, useCallback } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GasGauge } from "./GasGauge"
import { getAlertLevel } from "@/lib/utils"
import { L } from "@/lib/lang"

interface SensorPoint {
  id: string
  co2: number
  methane: number
  timestamp: string
}

interface BinDetailData {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  sensors: SensorPoint[]
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

export function BinDetail({ binId, onClose }: { binId: string; onClose: () => void }) {
  const [data, setData] = useState<BinDetailData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/bins/${binId}`)
    if (!res.ok) return
    const json = await res.json()
    setData(json)
    setLoading(false)
  }, [binId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [fetchData])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          {L.binDetailLoading}
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          {L.binDetailNoData}
        </CardContent>
      </Card>
    )
  }

  const latest = data.sensors[data.sensors.length - 1]
  const alertInfo = latest
    ? getAlertLevel(latest.co2, latest.methane)
    : getAlertLevel(0, 0)
  const { level } = alertInfo

  const chartData = data.sensors.map((s) => ({
    time: formatTime(s.timestamp),
    CO2: s.co2,
    Methane: s.methane,
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-gray-900">
                {data.name}
              </h3>
              {level !== "safe" && (
                <Badge variant={level === "danger" ? "danger" : "warning"}>
                  {level === "danger" ? L.binDetailDanger : L.binDetailWarning}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{data.address}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {latest && (
          <GasGauge co2={latest.co2} methane={latest.methane} />
        )}

        {chartData.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              {L.binDetailChartTitle}
            </h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="CO2"
                    name="CO2"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Methane"
                    name="Methane"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">{L.binDetailLatitude}</p>
            <p className="font-medium">{data.lat.toFixed(4)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">{L.binDetailLongitude}</p>
            <p className="font-medium">{data.lng.toFixed(4)}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">{L.binDetailReadings}</p>
            <p className="font-medium">{data.sensors.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
