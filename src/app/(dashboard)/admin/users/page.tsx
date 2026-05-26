"use client"

import { useEffect, useState } from "react"
import { UserData } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { L } from "@/lib/lang"

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
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {L.adminUsersTitle}
        </h1>
        <p className="text-sm text-gray-500">
          {L.adminUsersCount(users.length)}
        </p>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  {L.adminUsersName}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  {L.adminUsersRole}
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  {L.adminUsersCreated}
                </th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">
                  {L.adminUsersActions}
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
                      {user.role === "ADMIN" ? L.adminUsersBadgeAdmin : L.adminUsersBadgeUser}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRole(user.id, user.role)}
                    >
                      {user.role === "ADMIN" ? L.adminUsersDemote : L.adminUsersPromote}
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
