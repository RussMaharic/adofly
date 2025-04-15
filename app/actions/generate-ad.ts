"use server"

import type { GeneratedAd } from "@/types/ad"
import { generateProductImage } from "./generate-image"

interface AdGenerationInput {
  name: string
  product: string
  description: string
  targetAudience: string
  platform: string
}

export async function generateAd(input: AdGenerationInput): Promise<GeneratedAd> {
  try {
    // Generate ad content based on input
    const adContent = generateAdContent(input)

    // Create image description for the product
    const imageDescription = `${input.product} ${input.description.split(" ").slice(0, 5).join(" ")}`

    // Generate image URL
    const imageUrl = await generateProductImage(imageDescription)

    // Create a new ad object
    const newAd: GeneratedAd = {
      id: crypto.randomUUID(),
      name: input.name,
      headline: adContent.headline,
      caption: adContent.caption,
      imageUrl: imageUrl,
      platform: input.platform,
      isPublished: false,
      createdAt: new Date().toISOString(),
      performanceScore: Math.random() * 0.3 + 0.7, // Random score between 0.7 and 1.0
      engagementMetrics: {
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 30),
      },
    }

    return newAd
  } catch (error) {
    console.error("Error generating ad:", error)
    throw new Error((error as Error).message || "Failed to generate ad")
  }
}

// Function to generate ad content based on input
function generateAdContent(input: AdGenerationInput) {
  // Create headline variations
  const headlineTemplates = [
    `${input.product}: Designed for Everyone`,
    `Introducing ${input.product}: The Ultimate Solution`,
    `Transform Your Experience with ${input.product}`,
    `${input.product}: Perfect for ${input.targetAudience}`,
    `${input.product}: Where Quality Meets Style`,
  ]

  // Create caption variations
  const captionTemplates = [
    `${input.description} Designed specifically for ${input.targetAudience}.`,
    `Discover how ${input.product} can enhance your lifestyle. Perfect for ${input.targetAudience}.`,
    `Are you looking for the perfect ${input.product.toLowerCase()}? Look no further! Designed with ${input.targetAudience} in mind.`,
    `${input.product}: Feature-rich and designed to make your life better. Perfect for ${input.targetAudience}.`,
    `Join thousands of satisfied customers who've transformed their experience with ${input.product}.`,
  ]

  // Select random variations
  const headline = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)]
  const caption = captionTemplates[Math.floor(Math.random() * captionTemplates.length)]

  return {
    headline,
    caption,
  }
}
