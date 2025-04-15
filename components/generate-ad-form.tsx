"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types/database"
import { generateAd } from "@/app/actions/generate-ad"
import { Loader2, Sparkles } from "lucide-react"

interface GenerateAdFormProps {
  products: Product[]
}

export function GenerateAdForm({ products }: GenerateAdFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Instagram")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("productId", selectedProduct)
      formData.append("platformType", selectedPlatform)

      const result = await generateAd(formData)

      if (result.success) {
        // Refresh the page to show new ad
        router.refresh()
      } else {
        console.error("Failed to generate ad:", result.error)
        alert(`Failed to generate ad: ${result.error}`)
      }
    } catch (error) {
      console.error("Error generating ad:", error)
      alert("An error occurred while generating the ad")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Ad</CardTitle>
        <CardDescription>Create a new ad using AI by selecting a product and platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="generate-ad-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              Select Product
            </label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="platform" className="text-sm font-medium">
              Select Platform
            </label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="generate-ad-form"
          disabled={!selectedProduct || !selectedPlatform || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Ad
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
