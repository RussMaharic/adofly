"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PlusCircle, BarChart3, Settings, X } from "lucide-react"

interface DashboardSidebarProps {
  isSheet?: boolean
  setIsOpen?: (open: boolean) => void
}

export default function DashboardSidebar({ isSheet, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      exact: true,
    },
    {
      href: "/dashboard/create-ad",
      label: "Create Ad",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      href: "/dashboard/ads",
      label: "Ad Campaigns",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const handleClick = () => {
    if (isSheet && setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", isSheet && "px-0")}>
      {isSheet && (
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Ad</span>Flow
          </Link>
          <Button variant="ghost" size="icon" onClick={handleClick}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={handleClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors",
                {
                  "bg-muted": route.exact ? pathname === route.href : pathname.startsWith(route.href),
                },
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
