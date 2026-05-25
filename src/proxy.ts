import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function proxy(request: Request) {
  const url = new URL(request.url)
  const { pathname } = url

  const session = await auth()
  const isLoggedIn = !!session
  const role = (session?.user as { role?: string })?.role

  const adminRoutes = ["/admin"]
  const userRoutes = ["/dashboard", "/scan", "/history"]
  const authRoutes = ["/login", "/register"]
  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r))
  const isUserRoute = userRoutes.some((r) => pathname.startsWith(r))

  if (!isLoggedIn && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/login", url))
  }

  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/user/dashboard", url))
  }

  if (isLoggedIn && isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user/dashboard", url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}
