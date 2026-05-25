"use client"

import { AlertData } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AlertBanner({
  alerts,
  onMarkRead,
  onMarkAllRead,
}: {
  alerts: AlertData[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
}) {
  const unread = alerts.filter((a) => !a.isRead)

  if (unread.length === 0) return null

  return (
    <div className="space-y-2">
      {onMarkAllRead && unread.length > 1 && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      )}
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
          <div className="flex items-center gap-2 shrink-0">
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
            {onMarkRead && (
              <button
                onClick={() => onMarkRead(alert.id)}
                className="text-xs text-gray-400 hover:text-emerald-600 transition-colors"
                title="Đánh dấu đã đọc"
              >
                ✕
              </button>
            )}
          </div>
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
