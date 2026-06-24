"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { L } from "@/lib/lang"

const userLinks = [
  { href: "/user/dashboard", label: L.navDashboard, icon: "📊" },
  { href: "/user/scan", label: L.navClassifyWaste, icon: "📷" },
  { href: "/user/history", label: L.navHistory, icon: "📋" },
]

const adminLinks = [
  { href: "/admin", label: L.navDashboard, icon: "📊" },
  { href: "/admin/bins", label: L.navBinManagement, icon: "🗑️" },
  { href: "/admin/users", label: L.navUsers, icon: "👥" },
  { href: "/admin/alerts", label: L.navAlerts, icon: "🔔" },
]

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname()
  const links = userLinks

  function handleNav() {
    onClose?.()
  }

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-emerald-700">
            🌱 EcoBin Monitor
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {L.navSubtitle}
          </p>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 text-xl">
          ✕
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-xs">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-gray-900">
              User
            </p>
            <p className="text-xs text-gray-500 truncate">
              {L.navRoleUser}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[1001] lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Mobile sidebar (off-canvas) */}
      <aside
        className={`fixed inset-y-0 left-0 z-[1002] w-64 bg-white shadow-xl flex flex-col transform transition-transform duration-200 lg:static lg:translate-x-0 lg:shadow-none lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
