"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

interface AdPreviewProps {
  platform: string
  adContent: any
  isLoading: boolean
}

export function AdPreview({ platform, adContent, isLoading }: AdPreviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    )
  }

  if (!adContent) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 border-2 border-dashed rounded-lg">
        <div className="mb-4">
          {platform === "facebook" && <Facebook className="h-12 w-12 text-muted-foreground" />}
          {platform === "instagram" && <Instagram className="h-12 w-12 text-muted-foreground" />}
          {platform === "twitter" && <Twitter className="h-12 w-12 text-muted-foreground" />}
          {platform === "linkedin" && <Linkedin className="h-12 w-12 text-muted-foreground" />}
        </div>
        <h3 className="text-lg font-medium mb-2">No Ad Generated Yet</h3>
        <p className="text-muted-foreground">
          Fill in the details on the left and click "Generate Ad" to create your ad content.
        </p>
      </div>
    )
  }

  // Render different preview based on platform
  switch (platform) {
    case "facebook":
      return <FacebookAdPreview adContent={adContent} />
    case "instagram":
      return <InstagramAdPreview adContent={adContent} />
    case "twitter":
      return <TwitterAdPreview adContent={adContent} />
    case "linkedin":
      return <LinkedInAdPreview adContent={adContent} />
    default:
      return <FacebookAdPreview adContent={adContent} />
  }
}

function FacebookAdPreview({ adContent }: { adContent: any }) {
  return (
    <Card className="border-facebook overflow-hidden">
      <div className="bg-[#f0f2f5] p-3">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <p className="font-semibold text-sm">Business Name</p>
            <p className="text-xs text-gray-500">
              Sponsored · <span>👥</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm">{adContent.description}</p>
      </div>
      <div className="relative h-60 w-full bg-gray-100">
        <Image
          src={adContent.imageUrl || "/social-media-engagement.png"}
          alt="Ad image"
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-white p-3">
        <p className="text-xs text-gray-500 uppercase">businessname.com</p>
        <h3 className="font-bold text-lg">{adContent.headline}</h3>
        <button className="mt-2 bg-blue-600 text-white w-full py-1.5 rounded-md font-medium">
          {adContent.callToAction}
        </button>
      </div>
    </Card>
  )
}

function InstagramAdPreview({ adContent }: { adContent: any }) {
  return (
    <Card className="border-instagram overflow-hidden">
      <div className="bg-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 flex items-center justify-center text-white font-bold">
              B
            </div>
            <p className="font-semibold text-sm">businessname</p>
          </div>
          <p className="text-xs text-gray-500">Sponsored</p>
        </div>
      </div>
      <div className="relative h-80 w-full bg-gray-100">
        <Image src={adContent.imageUrl || "/vibrant-market-ad.png"} alt="Ad image" fill className="object-cover" />
      </div>
      <div className="bg-white p-3">
        <p className="text-sm">{adContent.headline}</p>
        <p className="text-sm mt-1">{adContent.description}</p>
        <button className="mt-3 bg-blue-500 text-white w-full py-1.5 rounded-md font-medium">
          {adContent.callToAction}
        </button>
      </div>
    </Card>
  )
}

function TwitterAdPreview({ adContent }: { adContent: any }) {
  return (
    <Card className="border-twitter overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <div className="flex items-center">
              <p className="font-bold text-sm">Business Name</p>
              <p className="text-gray-500 text-sm ml-1">@businessname</p>
            </div>
            <p className="text-xs text-gray-500">Promoted</p>
          </div>
        </div>
        <p className="mt-3 text-sm">{adContent.headline}</p>
        <p className="mt-1 text-sm">{adContent.description}</p>
        <div className="mt-3 relative h-48 w-full rounded-xl overflow-hidden">
          <Image
            src={adContent.imageUrl || "/social-media-promotion.png"}
            alt="Ad image"
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-3 flex justify-between">
          <button className="border border-blue-400 text-blue-400 px-4 py-1 rounded-full font-medium text-sm">
            {adContent.callToAction}
          </button>
        </div>
      </div>
    </Card>
  )
}

function LinkedInAdPreview({ adContent }: { adContent: any }) {
  return (
    <Card className="border-linkedin overflow-hidden">
      <div className="bg-white p-4">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 rounded-md bg-blue-700 flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <p className="font-semibold text-sm">Business Name</p>
            <p className="text-xs text-gray-500">
              Sponsored · <span>👥</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm">{adContent.description}</p>
        <div className="mt-3 relative h-48 w-full bg-gray-100">
          <Image
            src={adContent.imageUrl || "/professional-networking-growth.png"}
            alt="Ad image"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="mt-3 font-bold">{adContent.headline}</h3>
        <button className="mt-3 bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium text-sm">
          {adContent.callToAction}
        </button>
      </div>
    </Card>
  )
}
