import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-4">Could not find the requested page.</p>
      <Link href="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Go to Login
      </Link>
    </div>
  )
}
