import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY

    // Check if API key exists and is valid (OpenAI keys start with "sk-")
    if (!apiKey || !apiKey.startsWith("sk-") || apiKey.includes("your-") || apiKey.includes("actual-api-key")) {
      return NextResponse.json(
        {
          error: "Missing or invalid OpenAI API key. Please add a valid OPENAI_API_KEY to your environment variables.",
          setup:
            "You need to add your OpenAI API key to your environment variables. Get your API key from https://platform.openai.com/account/api-keys",
        },
        { status: 500 },
      )
    }

    const {
      productName,
      productDescription,
      targetAudience,
      objective,
      tone,
      creativityLevel,
      includeEmojis,
      includeHashtags,
      platform,
    } = await req.json()

    // Validate required fields
    if (!productName || !productDescription) {
      return NextResponse.json({ error: "Product name and description are required" }, { status: 400 })
    }

    // Create a system prompt for the ad content generation
    const systemPrompt = `You are an expert marketing copywriter specializing in social media ads.
    Your task is to create compelling ad content for a ${platform} ad with the following characteristics:
    - Tone: ${tone || "professional"}
    - Campaign objective: ${objective || "awareness"}
    - Target audience: ${targetAudience || "general audience"}
    - Creativity level: ${creativityLevel ? creativityLevel[0] : 50}% (higher means more creative)
    ${includeEmojis ? "- Include relevant emojis in the content" : "- Do not include emojis"}
    ${includeHashtags ? "- Include 2-3 relevant hashtags" : "- Do not include hashtags"}

    IMPORTANT: Respond with ONLY a valid JSON object with no markdown formatting, no code blocks, and no backticks.
    The response should be a raw JSON object that can be directly parsed.
    
    The JSON should have this exact format:
    {
      "headline": "The main headline for the ad (max 65 characters)",
      "description": "The main ad copy (appropriate length for ${platform})",
      "callToAction": "A compelling call to action phrase",
      "imagePrompt": "A detailed description for generating an image that would work well with this ad"
    }
    
    Do not include any explanations, comments, or additional text outside of the JSON object.`

    // Create a user prompt with the product details
    const userPrompt = `Create an ad for the following product:
    
    Product name: ${productName}
    Product description: ${productDescription}
    Target audience: ${targetAudience || "Not specified"}
    
    The ad will be displayed on ${platform}.`

    try {
      // Generate ad content using OpenAI
      const { text: adContentText } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: userPrompt,
        temperature: creativityLevel ? creativityLevel[0] / 100 : 0.5,
      })

      // Clean the response to ensure it's valid JSON
      let cleanedResponse = adContentText.trim()

      // Remove markdown code block formatting if present
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, "")
        cleanedResponse = cleanedResponse.replace(/\s*```$/, "")
      } else if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, "")
        cleanedResponse = cleanedResponse.replace(/\s*```$/, "")
      }

      // Parse the cleaned response
      const adContent = JSON.parse(cleanedResponse)

      // Prepare the response object with the ad content
      const responseData = {
        ...adContent,
        imageUrl: null, // Default to null, will be updated if image generation succeeds
      }

      // Define platform-specific fallback images
      const platformImages = {
        facebook: "/social-media-engagement.png",
        instagram: "/vibrant-market-ad.png",
        twitter: "/social-media-promotion.png",
        linkedin: "/professional-networking-growth.png",
      }

      try {
        // Enhanced image prompt with more specific details for better results
        const enhancedImagePrompt = `Create a high-quality advertisement image for ${platform} with the following details:
        ${adContent.imagePrompt}
        Product: ${productName}
        Target audience: ${targetAudience || "General audience"}
        Tone: ${tone || "professional"}
        Style: Professional advertisement suitable for ${platform}
        Make the image visually appealing and relevant to the ad headline: "${adContent.headline}"`

        // Use fetch to call OpenAI API directly instead of using the client library
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedImagePrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url",
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error?.message || "Image generation failed")
        }

        const imageData = await response.json()

        // Check if we have a valid image URL
        if (imageData.data && imageData.data.length > 0 && imageData.data[0].url) {
          responseData.imageUrl = imageData.data[0].url
        } else {
          // If no URL is returned but no error was thrown, use fallback
          console.warn("Image generation succeeded but returned no URL")
          responseData.imageUrl = platformImages[platform as keyof typeof platformImages] || "/vibrant-market-scene.png"
          responseData.imageGenerationStatus = "fallback_used"
        }
      } catch (imageError: any) {
        // Log the error but continue with the text-only ad
        console.error("Error generating image:", imageError)

        // Use platform-specific fallback image
        responseData.imageUrl = platformImages[platform as keyof typeof platformImages] || "/vibrant-market-scene.png"

        // Add error info to the response
        responseData.imageGenerationStatus = "error"
        responseData.imageError = "Failed to generate image. Using placeholder instead."

        // Include more detailed error for debugging if available
        if (imageError.message) {
          responseData.imageErrorDetails = imageError.message
        }
      }

      // Return the ad content (with image URL if available)
      return NextResponse.json(responseData)
    } catch (apiError: any) {
      console.error("OpenAI API error:", apiError)

      // Check for JSON parsing errors
      if (apiError instanceof SyntaxError && apiError.message.includes("JSON")) {
        return NextResponse.json(
          {
            error: "Failed to parse the AI response. The model returned an invalid format.",
            details: apiError.message,
          },
          { status: 500 },
        )
      }

      // Check for specific API key errors
      const errorMessage = apiError.message || "Unknown error"
      if (errorMessage.includes("API key")) {
        return NextResponse.json(
          {
            error: "Invalid OpenAI API key. Please check your API key and try again.",
            setup:
              "You need to add your OpenAI API key to your environment variables. Get your API key from https://platform.openai.com/account/api-keys",
          },
          { status: 401 },
        )
      }

      throw apiError // Re-throw for general error handling
    }
  } catch (error: any) {
    console.error("Error generating ad:", error)

    // Provide more detailed error message
    let errorMessage = "Failed to generate ad content"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      {
        error: errorMessage,
        setup:
          "If this is an API key error, please make sure you've added your OpenAI API key to your environment variables.",
      },
      { status: 500 },
    )
  }
}
