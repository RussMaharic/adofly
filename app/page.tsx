import { Suspense } from "react"
import { ClientOnly } from "@/components/client-only"
import { HomeRedirect } from "@/components/home-redirect"

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ClientOnly
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Welcome</p>
          </div>
        }
      >
        <HomeRedirect />
      </ClientOnly>
    </Suspense>
  )
}
