'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex space-x-6">
      <Link
        href="/"
        className="text-gray-700 hover:text-gray-900 font-semibold"
      >
        Home
      </Link>
      <Link
        href="/dashboard"
        className="text-gray-700 hover:text-gray-900 font-semibold"
      >
        Dashboard
      </Link>
    </nav>
  )
}
