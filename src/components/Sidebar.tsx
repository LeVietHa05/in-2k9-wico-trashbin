"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
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

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user)?.role
  const isAdmin = role === "ADMIN"
  const links = isAdmin ? adminLinks : userLinks

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-lg font-bold text-emerald-700">
          🌱 EcoBin Monitor
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {L.navSubtitle}
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
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
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-gray-900">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {isAdmin ? L.navRoleAdmin : L.navRoleUser}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
        >
          {L.navSignOut}
        </button>
      </div>
    </aside>
  )
}
