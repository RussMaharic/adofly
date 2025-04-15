"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"
import { useState } from "react"
import type { GeneratedAd } from "@/types/ad"
import { toast } from "@/hooks/use-toast"

interface MetaPublisherProps {
  ad: GeneratedAd | null
}

export function MetaPublisher({ ad }: MetaPublisherProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const handlePublish = async () => {
    if (!ad) return

    setIsPublishing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsPublishing(false)
    setIsPublished(true)

    toast({
      title: "Ad published successfully",
      description: `Your ad "${ad.name}" has been published to ${ad.platform}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish to Social Media</CardTitle>
        <CardDescription>Publish your selected ad to social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        {ad ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected Ad</p>
              <p className="text-sm">{ad.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Platform</p>
              <p className="text-sm">{ad.platform}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="flex items-center">
                {ad.isPublished || isPublished ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <p className="text-sm text-green-500">Published</p>
                  </>
                ) : (
                  <p className="text-sm text-amber-500">Ready to publish</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Select an ad to publish</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handlePublish}
          disabled={!ad || isPublishing || isPublished || (ad && ad.isPublished)}
        >
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : isPublished || (ad && ad.isPublished) ? (
            "Published"
          ) : (
            "Publish Ad"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
