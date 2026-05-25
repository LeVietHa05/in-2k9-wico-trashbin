import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-emerald-700">🌱 EcoBin Monitor</h1>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Đăng ký
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <div className="text-7xl mb-6">♻️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hệ thống Quản lý Thùng rác Thông minh
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Phân loại rác hữu cơ / vô cơ bằng AI, giám sát khí thải CO₂ và Metan
            theo thời gian thực, cảnh báo khi có nguy cơ ảnh hưởng môi trường.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-10">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🤖</div>
              <p className="text-sm font-medium">Phân loại AI</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm font-medium">Bản đồ theo dõi</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🚨</div>
              <p className="text-sm font-medium">Cảnh báo khí</p>
            </div>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Bắt đầu ngay
          </Link>
        </div>
      </main>
    </div>
  )
}
