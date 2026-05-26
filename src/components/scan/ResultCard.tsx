"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { L } from "@/lib/lang"

export function ResultCard({
  result,
  confidence,
}: {
  result: string | null
  confidence: number | null
}) {
  if (!result) return null

  const isOrganic = result === "Organic"
  const confidencePercent = ((confidence ?? 0) * 100).toFixed(1)

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{isOrganic ? "🌿" : "♻️"}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {L.resultCardResult}: {result}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isOrganic ? "success" : "warning"}>
                {isOrganic ? L.resultCardOrganic : L.resultCardInorganic}
              </Badge>
              <span className="text-sm text-gray-500">
                {L.resultCardConfidence}: {confidencePercent}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
