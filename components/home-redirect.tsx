"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function HomeRedirect() {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Set a flag to avoid state updates during hydration
    setIsRedirecting(true)
    // Use a small timeout to ensure this happens after hydration
    const redirectTimer = setTimeout(() => {
      router.push("/login")
    }, 10)

    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">{isRedirecting ? "Redirecting to login..." : "Welcome"}</p>
    </div>
  )
}
