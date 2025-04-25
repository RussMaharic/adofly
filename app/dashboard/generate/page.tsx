"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AdPreview } from "@/components/generate/ad-preview"
import { Loader2, Wand2, AlertCircle, ExternalLink, Info } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function GenerateAdsPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAd, setGeneratedAd] = useState<any>(null)
  const [platform, setPlatform] = useState("facebook")
  const [error, setError] = useState<{ message: string; setup?: string; details?: string } | null>(null)
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    targetAudience: "",
    objective: "awareness",
    tone: "professional",
    creativityLevel: [50],
    includeEmojis: true,
    includeHashtags: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user makes changes
    if (error) setError(null)
  }

  const handleGenerate = async () => {
    // Validate required fields
    if (!formData.productName || !formData.productDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both product name and description.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          platform,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Extract error details from the response
        const errorMessage = data.error || "Failed to generate ad"
        const setupInstructions = data.setup || undefined
        const errorDetails = data.details || undefined

        setError({
          message: errorMessage,
          setup: setupInstructions,
          details: errorDetails,
        })

        toast({
          title: "Generation failed",
          description: errorMessage,
          variant: "destructive",
        })
        return
      }

      // Check if we have an image error but the ad content was generated
      if (data.imageGenerationStatus === "error") {
        toast({
          title: "Partial success",
          description: "Ad content was generated but image creation failed. Using placeholder image instead.",
          variant: "default",
        })
      }

      setGeneratedAd(data)

      toast({
        title: "Ad generated successfully",
        description: "Your ad content has been created.",
      })
    } catch (error) {
      console.error("Error generating ad:", error)

      // Set error message for display
      let errorMessage = "Failed to generate ad content"

      if (error instanceof Error) {
        errorMessage = error.message
      }

      setError({
        message: errorMessage,
      })

      toast({
        title: "Generation failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveAd = () => {
    // Save the generated ad to local storage or context
    if (generatedAd) {
      localStorage.setItem(
        "savedAd",
        JSON.stringify({
          ...generatedAd,
          platform,
          productDetails: formData,
        }),
      )

      toast({
        title: "Ad saved",
        description: "Your ad has been saved and is ready to publish.",
      })

      // Redirect to publish page
      router.push("/dashboard/publish")
    }
  }

  const isApiKeyError = error?.message?.toLowerCase().includes("api key")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Generate Ads</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>{error.message}</p>

            {error.details && (
              <div className="bg-destructive/20 p-4 rounded-md">
                <p className="font-semibold">Error Details:</p>
                <p className="font-mono text-sm">{error.details}</p>
              </div>
            )}

            {isApiKeyError && (
              <div className="bg-destructive/20 p-4 rounded-md space-y-4">
                <p className="font-semibold">API Key Setup Required</p>
                <p>This application requires an OpenAI API key to function. You need to:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Get an API key from{" "}
                    <a
                      href="https://platform.openai.com/account/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline flex items-center"
                    >
                      OpenAI's website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </li>
                  <li>Add the API key to your environment variables</li>
                </ol>

                <div className="bg-background/20 p-3 rounded-md">
                  <p className="font-mono text-sm mb-2"># In your .env.local file:</p>
                  <p className="font-mono text-sm">OPENAI_API_KEY=sk-...</p>
                </div>

                <p>After adding your API key, restart your development server.</p>

                {error.setup && (
                  <div className="mt-2">
                    <p className="font-semibold">Additional instructions:</p>
                    <p>{error.setup}</p>
                  </div>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {generatedAd?.imageGenerationStatus === "error" && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Image Generation Notice</AlertTitle>
          <AlertDescription>
            We were able to generate your ad content, but the image generation failed. A placeholder image is being used
            instead. This could be due to API limits or permissions.
            {generatedAd?.imageErrorDetails && (
              <div className="mt-2 text-sm opacity-80">Error details: {generatedAd.imageErrorDetails}</div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Details</CardTitle>
              <CardDescription>Provide information about your product and target audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product/Service Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g. FitTrack Smart Watch"
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Product/Service Description</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product or service in detail"
                  rows={4}
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange("productDescription", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Textarea
                  id="target-audience"
                  placeholder="Describe your ideal customer (age, interests, pain points, etc.)"
                  rows={3}
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select value={formData.objective} onValueChange={(value) => handleInputChange("objective", value)}>
                  <SelectTrigger id="objective">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creative Settings</CardTitle>
              <CardDescription>Customize how your ad will be generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Voice</Label>
                <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Creativity Level</Label>
                <div className="pt-2">
                  <Slider
                    value={formData.creativityLevel}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleInputChange("creativityLevel", value)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-emojis">Include Emojis</Label>
                <Switch
                  id="include-emojis"
                  checked={formData.includeEmojis}
                  onCheckedChange={(checked) => handleInputChange("includeEmojis", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-hashtags">Include Hashtags</Label>
                <Switch
                  id="include-hashtags"
                  checked={formData.includeHashtags}
                  onCheckedChange={(checked) => handleInputChange("includeHashtags", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Selection</CardTitle>
              <CardDescription>Choose the platform for your ad</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="facebook" onValueChange={setPlatform}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full flex items-center gap-2" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Ad
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ad Preview</CardTitle>
              <CardDescription>
                {generatedAd ? "Your generated ad" : "Your ad will appear here after generation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdPreview platform={platform} adContent={generatedAd} isLoading={isGenerating} />
            </CardContent>
            {generatedAd && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleGenerate}>
                  Regenerate
                </Button>
                <Button onClick={handleSaveAd}>Save & Continue</Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
