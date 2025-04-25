import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Brand section with solid blue background */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="z-10 w-full max-w-md">
          {/* Greeting */}
          <h1 className="text-white text-5xl font-bold mb-4">
            Hello
            <br />
            AdoFly! 👋
          </h1>

          {/* Description */}
          <p className="text-blue-100 text-xl">
            Create stunning AI-powered ad campaigns in minutes. Boost your marketing performance and save valuable time.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-blue-200 z-10 absolute bottom-6">
          © {new Date().getFullYear()} AdoFly. All rights reserved.
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
