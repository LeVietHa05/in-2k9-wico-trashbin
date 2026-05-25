"use client"

import { useEffect, useState } from "react"
import { ScanResult, AlertData } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanResult[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])

  useEffect(() => {
    fetch("/api/scan/history")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setScans(data))
    fetch("/api/alerts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setAlerts(data))
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lịch sử</h1>
        <p className="text-sm text-gray-500 mt-1">
          Lịch sử phân loại rác và cảnh báo
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Lịch sử phân loại
          </h2>
          {scans.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-2xl">
                    {scan.result === "Hữu cơ" ? "🌿" : "♻️"}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          scan.result === "Hữu cơ" ? "success" : "warning"
                        }
                      >
                        {scan.result}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {(scan.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(scan.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Lịch sử cảnh báo
          </h2>
          {alerts.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có cảnh báo nào</p>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.isRead ? "bg-gray-50" : "bg-yellow-50"
                  }`}
                >
                  <span className="text-lg">
                    {alert.type === "BOTH" ? "🚨" : "⚠️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(alert.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  {!alert.isRead && (
                    <Badge variant="warning">Mới</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
