"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(e.currentTarget)
    const name = form.get("name") as string
    const email = form.get("email") as string
    const password = form.get("password") as string
    const confirm = form.get("confirmPassword") as string

    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp")
      setLoading(false)
      return
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Đăng ký thất bại")
      setLoading(false)
      return
    }

    router.push("/login?registered=true")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <div className="text-4xl mb-2">🌱</div>
            <h1 className="text-xl font-bold text-gray-900">Đăng ký</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tạo tài khoản mới
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Họ tên" name="name" placeholder="Nguyễn Văn A" required />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
            <Input
              label="Mật khẩu"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Input
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-emerald-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
