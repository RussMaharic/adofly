"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageCircle, Share2, Loader2 } from "lucide-react"
import type { GeneratedAd } from "@/types/ad"

interface AdPreviewProps {
  ad?: GeneratedAd | null
}

export function AdPreview({ ad }: AdPreviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [timeAgo, setTimeAgo] = useState("Just now")

  // Reset states when ad changes
  useEffect(() => {
    if (ad) {
      setImageLoaded(false)

      // Update time ago
      if (ad.createdAt) {
        const updateTimeAgo = () => {
          const now = new Date()
          const createdAt = new Date(ad.createdAt)
          const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000)

          if (diffInSeconds < 60) {
            setTimeAgo(`${diffInSeconds} seconds ago`)
          } else if (diffInSeconds < 3600) {
            setTimeAgo(`${Math.floor(diffInSeconds / 60)} minutes ago`)
          } else if (diffInSeconds < 86400) {
            setTimeAgo(`${Math.floor(diffInSeconds / 3600)} hours ago`)
          } else {
            setTimeAgo(`${Math.floor(diffInSeconds / 86400)} days ago`)
          }
        }

        updateTimeAgo()
        const interval = setInterval(updateTimeAgo, 60000)
        return () => clearInterval(interval)
      }
    }
  }, [ad])

  // If no ad is provided, show placeholder
  if (!ad) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[400px] w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Generate an ad to see the preview</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {ad.platform.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{ad.platform} Page</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <div className="p-4 pt-0 pb-2">
          <h3 className="font-bold text-lg mb-2">{ad.headline}</h3>
        </div>
        <div className="relative h-[300px] w-full bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          <Image
            src={ad.imageUrl || "/images/generic-product.jpg"}
            alt={ad.headline || "Ad preview"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.log("Image failed to load, using fallback")
              setImageLoaded(true)
            }}
            className={imageLoaded ? "opacity-100" : "opacity-0"}
          />
        </div>
        <div className="p-4">
          <p>{ad.caption}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-4 border-t">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{ad.engagementMetrics?.likes || 0}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{ad.engagementMetrics?.comments || 0}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" />
            <span>{ad.engagementMetrics?.shares || 0}</span>
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
