"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}
