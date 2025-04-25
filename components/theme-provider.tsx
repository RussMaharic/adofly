"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { ClientOnly } from "./client-only"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ClientOnly fallback={children}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ClientOnly>
  )
}
