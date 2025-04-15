import Link from "next/link"
import { LayoutGrid, PlusCircle, BarChart3, Settings } from "lucide-react"

export function Navigation() {
  return (
    <div className="fixed inset-y-0 left-0 z-10 w-56 bg-white border-r border-gray-200 py-4 hidden md:block">
      <div className="px-6 mb-8">
        <Link href="/" className="text-xl font-bold">
          Ad Flow
        </Link>
      </div>

      <nav className="space-y-1 px-3">
        <Link href="/" className="flex items-center px-3 py-3 text-gray-900 rounded-md hover:bg-gray-100">
          <LayoutGrid className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link href="/create-ad" className="flex items-center px-3 py-3 text-gray-900 rounded-md hover:bg-gray-100">
          <PlusCircle className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Create Ad</span>
        </Link>

        <Link href="/publish-ad" className="flex items-center px-3 py-3 text-gray-900 rounded-md hover:bg-gray-100">
          <PlusCircle className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Ad Campaigns</span>
        </Link>

        <Link href="/analytics" className="flex items-center px-3 py-3 text-gray-900 rounded-md hover:bg-gray-100">
          <BarChart3 className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Analytics</span>
        </Link>

        <Link href="/settings" className="flex items-center px-3 py-3 text-gray-900 rounded-md hover:bg-gray-100">
          <Settings className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>
    </div>
  )
}
