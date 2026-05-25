"use client"

import { useEffect, useState } from "react"
import { UserData } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    fetch("/api/users")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setUsers(data))
  }, [])

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN"
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole as "USER" | "ADMIN" } : u
        )
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý người dùng
        </h1>
        <p className="text-sm text-gray-500">
          {users.length} người dùng
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Tên
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Vai trò
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Ngày tạo
                </th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <Badge
                      variant={user.role === "ADMIN" ? "danger" : "default"}
                    >
                      {user.role === "ADMIN" ? "Admin" : "User"}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRole(user.id, user.role)}
                    >
                      {user.role === "ADMIN" ? "Hạ user" : "Lên admin"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
