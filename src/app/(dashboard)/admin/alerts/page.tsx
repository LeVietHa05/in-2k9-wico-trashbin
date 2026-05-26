"use client"

import { useEffect, useState } from "react"
import { AlertData } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { L } from "@/lib/lang"

export default function AdminAlertsPage() {
  const [alerts, setAlerts] = useState<AlertData[]>([])

  useEffect(() => {
    fetch("/api/alerts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setAlerts(data))
  }, [])

  async function markRead(alertId: string) {
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

  async function markAllRead() {
    await Promise.all(
      alerts.filter((a) => !a.isRead).map((a) => markRead(a.id))
    )
  }

  const unread = alerts.filter((a) => !a.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{L.adminAlertsTitle}</h1>
          <p className="text-sm text-gray-500">
            {L.adminAlertsCount(alerts.length, unread)}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="secondary" onClick={markAllRead}>
            {L.adminAlertsMarkAllRead}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`${!alert.isRead ? "ring-2 ring-yellow-400" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">
                  {alert.type === "BOTH" ? "🚨" : "⚠️"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.message}
                    </p>
                    {!alert.isRead && <Badge variant="warning">{L.adminAlertsNew}</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge
                      variant={
                        alert.type === "BOTH"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {alert.type === "BOTH"
                        ? "CO₂ + CH₄"
                        : alert.type === "HIGH_CO2"
                          ? "CO₂"
                          : "CH₄"}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {alert.bin?.name} &middot;{" "}
                      {new Date(alert.createdAt).toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
                {!alert.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markRead(alert.id)}
                  >
                    {L.adminAlertsRead}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {alerts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              {L.adminAlertsNone}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
