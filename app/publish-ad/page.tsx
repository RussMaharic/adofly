"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdPreview } from "@/components/ad-preview"
import { MetaPublisher } from "@/components/meta-publisher"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { GeneratedAd } from "@/types/ad"

// Mock data for generated ads
const mockAds: GeneratedAd[] = [
  {
    id: "1",
    name: "Summer Shoe Campaign",
    headline: "Step Into Comfort with EcoBoost Running Shoes",
    caption:
      "Introducing our latest EcoBoost Running Shoes collection! Engineered for performance with advanced cushioning technology. Perfect for runners of all levels who want to stay active in style.",
    imageUrl: "/images/running-shoes-ad.jpg",
    platform: "Facebook",
    isPublished: false,
    performanceScore: 0.92,
    createdAt: new Date().toISOString(),
    engagementMetrics: {
      likes: 0,
      comments: 0,
      shares: 0,
    },
  },
  {
    id: "2",
    name: "Trail Running Promotion",
    headline: "Run Faster, Go Further with TrailMaster Pro",
    caption:
      "Tired of uncomfortable shoes? Our TrailMaster Pro features breathable mesh and superior arch support. Ideal for trail running and designed with your comfort in mind.",
    imageUrl: "/images/running-shoes-ad.jpg",
    platform: "Instagram",
    isPublished: false,
    performanceScore: 0.87,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    engagementMetrics: {
      likes: 0,
      comments: 0,
      shares: 0,
    },
  },
  {
    id: "3",
    name: "UltraFlex Runner Campaign",
    headline: "UltraFlex Runners: Where Style Meets Performance",
    caption:
      "Step up your game with UltraFlex Runners. These aren't just shoes - they're your new secret weapon for better performance. Feel the difference with every step!",
    imageUrl: "/images/running-shoes-ad.jpg",
    platform: "Facebook",
    isPublished: true,
    performanceScore: 0.78,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    engagementMetrics: {
      likes: 24,
      comments: 3,
      shares: 5,
    },
  },
]

export default function PublishAdPage() {
  const [ads, setAds] = useState<GeneratedAd[]>([])
  const [selectedAd, setSelectedAd] = useState<GeneratedAd | null>(null)

  // Simulate loading ads from API
  useEffect(() => {
    // In a real app, this would fetch from your API
    setAds(mockAds)
  }, [])

  const handleDeleteAd = (adId: string) => {
    setAds(ads.filter((ad) => ad.id !== adId))
    if (selectedAd?.id === adId) {
      setSelectedAd(null)
    }
    toast({
      title: "Ad deleted",
      description: "The ad has been successfully deleted.",
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Publish Ads</h1>
        <p className="text-muted-foreground">Review your generated ads and publish them to social media platforms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generated Ads</CardTitle>
              <CardDescription>Select an ad to publish</CardDescription>
            </CardHeader>
            <CardContent>
              {ads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ads.map((ad) => (
                    <div
                      key={ad.id}
                      className={`relative cursor-pointer transition-all rounded-lg overflow-hidden border ${
                        selectedAd?.id === ad.id ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                    >
                      <div onClick={() => setSelectedAd(ad)}>
                        <div className="p-3 border-b bg-muted/30">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{ad.name}</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {ad.platform}
                            </span>
                          </div>
                        </div>
                        <AdPreview ad={ad} />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Ad</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this ad? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteAd(ad.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-muted-foreground">No ads available. Create some ads first.</p>
                  <Button className="mt-4" asChild>
                    <a href="/create-ad">Create Ad</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <MetaPublisher ad={selectedAd} />
        </div>
      </div>
    </div>
  )
}
