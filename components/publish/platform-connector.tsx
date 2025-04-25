"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PlatformConnectorProps {
  platform: string
  isConnected: boolean
  onConnect: () => void
}

export function PlatformConnector({ platform, isConnected, onConnect }: PlatformConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      onConnect()
    }, 1500)
  }

  const getPlatformIcon = () => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  const getPlatformName = () => {
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  if (isConnected) {
    return (
      <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="flex items-center gap-2">
          {getPlatformIcon()}
          {getPlatformName()} Connected
        </AlertTitle>
        <AlertDescription>Your {getPlatformName()} account is connected and ready to publish ads.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">{getPlatformIcon()}</div>
      <div className="text-center">
        <h3 className="font-medium">{getPlatformName()}</h3>
        <p className="text-sm text-muted-foreground">Connect your {getPlatformName()} account to publish ads</p>
      </div>
      <Button variant="outline" className="flex items-center gap-2" onClick={handleConnect} disabled={isConnecting}>
        {isConnecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            {getPlatformIcon()}
            Connect {getPlatformName()}
          </>
        )}
      </Button>
    </div>
  )
}
