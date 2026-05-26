import Link from "next/link"
import { L } from "@/lib/lang"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col">
      <header className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-emerald-700">🌱 EcoBin Monitor</h1>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {L.landingLogin}
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {L.landingSignUp}
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="max-w-2xl">
          <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">♻️</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {L.landingTitle}
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {L.landingSubtitle1}<br className="hidden sm:inline" />{" "}<span className="sm:inline">{L.landingSubtitle2}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto mb-8 sm:mb-10">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🤖</div>
              <p className="text-sm font-medium">{L.landingFeatureAI}</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm font-medium">{L.landingFeatureMap}</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🚨</div>
              <p className="text-sm font-medium">{L.landingFeatureGas}</p>
            </div>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 text-sm sm:text-base"
          >
            {L.landingGetStarted}
          </Link>
        </div>
      </main>
    </div>
  )
}
