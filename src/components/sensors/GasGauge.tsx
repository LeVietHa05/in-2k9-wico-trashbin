"use client"

import { getAlertLevel } from "@/lib/utils"
import { L } from "@/lib/lang"

export function GasGauge({
  co2,
  methane,
}: {
  co2: number
  methane: number
}) {
  const { level } = getAlertLevel(co2, methane)

  const co2Percent = Math.min((co2 / 2000) * 100, 100)
  const methanePercent = Math.min((methane / 1000) * 100, 100)

  const colorMap = {
    safe: { bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
    warning: { bar: "bg-yellow-500", text: "text-yellow-700", bg: "bg-yellow-50" },
    danger: { bar: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
  }

  const colors = colorMap[level]

  return (
    <div className={`rounded-xl p-4 ${colors.bg}`}>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{L.gasGaugeCo2}</span>
            <span className={`text-sm font-bold ${colors.text}`}>
              {co2} ppm
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${colors.bar}`}
              style={{ width: `${co2Percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {L.gasGaugeCo2Threshold}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{L.gasGaugeMethane}</span>
            <span className={`text-sm font-bold ${colors.text}`}>
              {methane} ppm
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${colors.bar}`}
              style={{ width: `${methanePercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {L.gasGaugeMethaneThreshold}
          </p>
        </div>
      </div>
    </div>
  )
}
