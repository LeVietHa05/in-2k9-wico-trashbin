"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { L } from "@/lib/lang"

export function ImageUploader({
  onScan,
}: {
  onScan: (file: File) => Promise<void>
}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleScan = async () => {
    const file = inputRef.current?.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      await onScan(file)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 transition-colors"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-64 rounded-lg"
            />
          ) : (
            <div className="text-gray-500">
              <div className="text-4xl mb-2">📸</div>
              <p className="font-medium">
                {L.imgUploaderDrop}
              </p>
              <p className="text-sm mt-1">
                {L.imgUploaderSupports}
              </p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {preview && (
          <div className="mt-4 flex gap-3">
            <Button
              onClick={() => {
                setPreview(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
              variant="secondary"
              disabled={loading}
            >
              {L.imgUploaderReselect}
            </Button>
            <Button onClick={handleScan} disabled={loading}>
              {loading ? L.imgUploaderClassifying : L.imgUploaderClassifyBtn}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
