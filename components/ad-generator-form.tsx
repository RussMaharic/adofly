"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { GeneratedAd } from "@/types/ad"
import { generateProductImage } from "@/app/actions/generate-image"

interface AdGeneratorFormProps {
  onAdGenerated: (ad: GeneratedAd) => void
}

export function AdGeneratorForm({ onAdGenerated }: AdGeneratorFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    product: "",
    description: "",
    targetAudience: "",
    platform: "Facebook",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlatformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, platform: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Generate headline and caption
      const headline = `${formData.product}: Designed for Everyone`
      const caption = `${formData.description} Designed specifically for ${formData.targetAudience}.`

      // Generate image URL based on product description
      const imageUrl = await generateProductImage(`${formData.product} ${formData.description}`)

      // Create the ad object
      const newAd: GeneratedAd = {
        id: crypto.randomUUID(),
        name: formData.name,
        headline,
        caption,
        imageUrl,
        platform: formData.platform,
        isPublished: false,
        createdAt: new Date().toISOString(),
        performanceScore: Math.random() * 0.3 + 0.7,
        engagementMetrics: {
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          shares: Math.floor(Math.random() * 30),
        },
      }

      onAdGenerated(newAd)
    } catch (error) {
      console.error("Error generating ad:", error)
      alert("Failed to generate ad. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Summer Shoe Campaign"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product Name</Label>
            <Input
              id="product"
              name="product"
              placeholder="Running Shoes"
              value={formData.product}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your product in detail"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              placeholder="Describe your target audience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={formData.platform} onValueChange={handlePlatformChange}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Ad"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
