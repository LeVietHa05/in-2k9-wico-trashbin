"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 text-xl"
          >
            ☰
          </button>
          <span className="font-semibold text-emerald-700 text-sm">🌱 EcoBin Monitor</span>
        </div>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
