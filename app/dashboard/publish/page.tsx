"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { AdPreview } from "@/components/generate/ad-preview"
import { PlatformConnector } from "@/components/publish/platform-connector"
import { Loader2, DollarSign, Target, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function PublishAdsPage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const [platform, setPlatform] = useState("facebook")
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  })
  const [adContent, setAdContent] = useState<any>(null)

  // Load saved ad from local storage
  useEffect(() => {
    const savedAdJson = localStorage.getItem("savedAd")
    if (savedAdJson) {
      try {
        const savedAd = JSON.parse(savedAdJson)
        setAdContent(savedAd)
        if (savedAd.platform) {
          setPlatform(savedAd.platform)
        }
      } catch (error) {
        console.error("Error parsing saved ad:", error)
      }
    } else {
      // No saved ad, redirect back to generate
      toast({
        title: "No ad found",
        description: "Please generate an ad first before publishing.",
        variant: "destructive",
      })
      router.push("/dashboard/generate")
    }
  }, [router])

  const handleConnectPlatform = (platform: string) => {
    setConnectedPlatforms((prev) => ({
      ...prev,
      [platform]: true,
    }))

    toast({
      title: "Platform connected",
      description: `Your ${platform} account has been connected successfully.`,
    })
  }

  const handlePublish = () => {
    setIsPublishing(true)

    // Check if at least one platform is selected
    if (!Object.values(connectedPlatforms).some((v) => v)) {
      toast({
        title: "No platforms selected",
        description: "Please connect at least one platform to publish your ad.",
        variant: "destructive",
      })
      setIsPublishing(false)
      return
    }

    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false)

      toast({
        title: "Ad published successfully",
        description: "Your ad has been published to the selected platforms.",
      })

      // Clear the saved ad from local storage
      localStorage.removeItem("savedAd")

      router.push("/dashboard/analytics")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Publish Ad</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Configure your ad campaign settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g. Summer Fitness Promotion"
                  defaultValue={
                    adContent?.productDetails?.productName ? `${adContent.productDetails.productName} Campaign` : ""
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-objective">Campaign Objective</Label>
                <Select defaultValue={adContent?.productDetails?.objective || "conversion"}>
                  <SelectTrigger id="campaign-objective">
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="consideration">Consideration</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="lead">Lead Generation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget & Targeting</CardTitle>
              <CardDescription>Set your budget and audience targeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Daily Budget</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input id="budget" className="pl-8" placeholder="50.00" defaultValue="50.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                  <Textarea
                    id="target-audience"
                    className="pl-8 pt-2"
                    placeholder="Describe your target audience"
                    defaultValue={adContent?.productDetails?.targetAudience || ""}
                    rows={3}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="location"
                    className="pl-8"
                    placeholder="e.g. United States, Canada"
                    defaultValue="United States, Canada, United Kingdom"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-optimization">Auto-optimization</Label>
                <Switch id="auto-optimization" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Selection</CardTitle>
              <CardDescription>Choose where to publish your ad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={platform} onValueChange={setPlatform}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>
                <TabsContent value="facebook" className="mt-4">
                  <PlatformConnector
                    platform="facebook"
                    isConnected={connectedPlatforms.facebook}
                    onConnect={() => handleConnectPlatform("facebook")}
                  />
                </TabsContent>
                <TabsContent value="instagram" className="mt-4">
                  <PlatformConnector
                    platform="instagram"
                    isConnected={connectedPlatforms.instagram}
                    onConnect={() => handleConnectPlatform("instagram")}
                  />
                </TabsContent>
                <TabsContent value="twitter" className="mt-4">
                  <PlatformConnector
                    platform="twitter"
                    isConnected={connectedPlatforms.twitter}
                    onConnect={() => handleConnectPlatform("twitter")}
                  />
                </TabsContent>
                <TabsContent value="linkedin" className="mt-4">
                  <PlatformConnector
                    platform="linkedin"
                    isConnected={connectedPlatforms.linkedin}
                    onConnect={() => handleConnectPlatform("linkedin")}
                  />
                </TabsContent>
              </Tabs>

              <div className="pt-4 space-y-2">
                <Label>Publish to Platforms</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-facebook"
                      defaultChecked={connectedPlatforms.facebook}
                      disabled={!connectedPlatforms.facebook}
                    />
                    <Label
                      htmlFor="publish-facebook"
                      className={!connectedPlatforms.facebook ? "text-muted-foreground" : ""}
                    >
                      Facebook
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-instagram"
                      defaultChecked={connectedPlatforms.instagram}
                      disabled={!connectedPlatforms.instagram}
                    />
                    <Label
                      htmlFor="publish-instagram"
                      className={!connectedPlatforms.instagram ? "text-muted-foreground" : ""}
                    >
                      Instagram
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-twitter"
                      defaultChecked={connectedPlatforms.twitter}
                      disabled={!connectedPlatforms.twitter}
                    />
                    <Label
                      htmlFor="publish-twitter"
                      className={!connectedPlatforms.twitter ? "text-muted-foreground" : ""}
                    >
                      Twitter
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-linkedin"
                      defaultChecked={connectedPlatforms.linkedin}
                      disabled={!connectedPlatforms.linkedin}
                    />
                    <Label
                      htmlFor="publish-linkedin"
                      className={!connectedPlatforms.linkedin ? "text-muted-foreground" : ""}
                    >
                      LinkedIn
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handlePublish}
                disabled={isPublishing || !Object.values(connectedPlatforms).some((v) => v)}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Campaign"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ad Preview</CardTitle>
              <CardDescription>Preview your ad before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <AdPreview platform={platform} adContent={adContent} isLoading={false} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/generate")}>
                Edit Ad
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !Object.values(connectedPlatforms).some((v) => v)}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
