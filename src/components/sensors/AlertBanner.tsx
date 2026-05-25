"use client"

import { AlertData } from "@/types"
import { Badge } from "@/components/ui/badge"

export function AlertBanner({ alerts }: { alerts: AlertData[] }) {
  const unread = alerts.filter((a) => !a.isRead)

  if (unread.length === 0) return null

  return (
    <div className="space-y-2">
      {unread.slice(0, 5).map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-3 rounded-lg border ${
            alert.type === "BOTH" || alert.type === "HIGH_CO2"
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <span className="text-lg">
            {alert.type === "BOTH" ? "🚨" : "⚠️"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(alert.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
          <Badge
            variant={
              alert.type === "BOTH"
                ? "danger"
                : alert.type === "HIGH_CO2"
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
        </div>
      ))}
      {unread.length > 5 && (
        <p className="text-xs text-gray-500 text-center">
          + {unread.length - 5} cảnh báo khác
        </p>
      )}
    </div>
  )
}
