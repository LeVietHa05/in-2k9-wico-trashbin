"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ResultCard({
  result,
  confidence,
}: {
  result: string | null
  confidence: number | null
}) {
  if (!result) return null

  const isOrganic = result === "Hữu cơ"
  const confidencePercent = ((confidence ?? 0) * 100).toFixed(1)

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{isOrganic ? "🌿" : "♻️"}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Kết quả: {result}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isOrganic ? "success" : "warning"}>
                {isOrganic ? "Rác hữu cơ" : "Rác vô cơ"}
              </Badge>
              <span className="text-sm text-gray-500">
                Độ tin cậy: {confidencePercent}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
