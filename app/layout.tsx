import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { UserNav } from "@/components/user-nav"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ad Flow",
  description: "Generate and manage ads using AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 md:pl-56">
              <header className="sticky top-0 z-40 border-b bg-background">
                <div className="flex h-16 items-center justify-end px-6">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                    <UserNav />
                  </div>
                </div>
              </header>
              <main className="px-6 py-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'