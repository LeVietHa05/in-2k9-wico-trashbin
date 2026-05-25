"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/scan/ImageUploader"
import { ResultCard } from "@/components/scan/ResultCard"

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
      setError(data.error || "Phân tích thất bại")
      return
    }

    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Phân loại rác</h1>
        <p className="text-sm text-gray-500 mt-1">
          Chụp hoặc tải lên hình ảnh rác để phân loại hữu cơ / vô cơ bằng AI
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
