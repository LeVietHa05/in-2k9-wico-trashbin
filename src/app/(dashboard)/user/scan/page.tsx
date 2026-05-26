"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/scan/ImageUploader"
import { ResultCard } from "@/components/scan/ResultCard"
import { L } from "@/lib/lang"

export default function ScanPage() {
  const [result, setResult] = useState<{
    result: string
    confidence: number
  } | null>(null)
  const [error, setError] = useState("")

  async function handleScan(file: File) {
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch("/api/scan", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || L.scanError)
      return
    }

    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{L.scanTitle}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {L.scanSubtitle}
        </p>
      </div>

      <ImageUploader onScan={handleScan} />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <ResultCard result={result.result} confidence={result.confidence} />
      )}
    </div>
  )
}
