import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { ClientOnly } from "@/components/client-only"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex">
          <div className="w-64 bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex-1">
            <div className="h-16 border-b"></div>
            <div className="container mx-auto p-6 max-w-7xl">
              <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <TopNav />
          <div className="container mx-auto p-6 max-w-7xl">
            <main className="w-full">{children}</main>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
}
