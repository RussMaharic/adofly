"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Loader2, Wand2 } from "lucide-react"
import { AdPreview } from "@/components/dashboard/ad-preview"

export default function CreateAdPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [adContent, setAdContent] = useState({
    title: "",
    description: "",
    primaryText: "",
    headline: "",
    linkDescription: "",
    targetAudience: "",
    objective: "awareness",
  })

  const generateAdContent = async () => {
    if (!adContent.objective || !adContent.targetAudience) {
      toast({
        title: "Missing information",
        description: "Please fill in the objective and target audience fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      // In a real app, this would call the OpenAI API
      // For demo purposes, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate AI-generated content
      const generatedContent = {
        title: `${adContent.objective === "awareness" ? "Discover" : "Try"} Our Product Today`,
        description: `Perfect for ${adContent.targetAudience}. Our solution helps you achieve more with less effort.`,
        primaryText: `Are you looking for a better way to ${adContent.objective === "awareness" ? "understand" : "solve"} your problems? Our product is designed specifically for ${adContent.targetAudience}.`,
        headline: `The #1 Solution for ${adContent.targetAudience}`,
        linkDescription: `Learn more about how we can help you ${adContent.objective === "awareness" ? "discover" : "achieve"} your goals.`,
      }

      setAdContent({
        ...adContent,
        ...generatedContent,
      })

      toast({
        title: "Content generated",
        description: "AI has created ad content based on your inputs.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your ad content.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const publishAd = async () => {
    // Validate required fields
    if (!adContent.title || !adContent.description || !adContent.headline) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
    try {
      // In a real app, this would call the Meta Marketing API
      // For demo purposes, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Ad published successfully",
        description: "Your ad has been submitted to Meta for review.",
      })

      router.push("/dashboard/ads")
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "There was an error publishing your ad.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAdContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setAdContent((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create New Ad</h2>
        <p className="text-muted-foreground">Design your ad with AI assistance and publish it to Meta platforms</p>
      </div>

      <Tabs defaultValue="create">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Ad</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Campaign Details</CardTitle>
              <CardDescription>Define your campaign objective and target audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select value={adContent.objective} onValueChange={(value) => handleSelectChange("objective", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="consideration">Consideration</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  placeholder="e.g., Small business owners, Fitness enthusiasts"
                  value={adContent.targetAudience}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={generateAdContent} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Ad Content with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ad Content</CardTitle>
              <CardDescription>Edit the AI-generated content or write your own</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Ad Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter ad title"
                  value={adContent.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  name="headline"
                  placeholder="Enter headline"
                  value={adContent.headline}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryText">Primary Text</Label>
                <Textarea
                  id="primaryText"
                  name="primaryText"
                  placeholder="Enter primary text"
                  value={adContent.primaryText}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={adContent.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkDescription">Link Description</Label>
                <Input
                  id="linkDescription"
                  name="linkDescription"
                  placeholder="Enter link description"
                  value={adContent.linkDescription}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={publishAd} disabled={isPublishing} className="w-full">
                {isPublishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Ad to Meta"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Preview</CardTitle>
              <CardDescription>See how your ad will look on different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <AdPreview adContent={adContent} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
