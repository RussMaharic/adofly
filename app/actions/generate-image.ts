"use server"

// Map of product keywords to image paths
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  shoe: "/images/shoes.jpg",
  shoes: "/images/shoes.jpg",
  sneaker: "/images/shoes.jpg",
  sneakers: "/images/shoes.jpg",
  footwear: "/images/shoes.jpg",

  shirt: "/images/tshirt.jpg",
  tshirt: "/images/tshirt.jpg",
  tee: "/images/tshirt.jpg",
  clothing: "/images/tshirt.jpg",

  watch: "/images/watch.jpg",
  timepiece: "/images/watch.jpg",
  wristwatch: "/images/watch.jpg",

  headphone: "/images/headphones.jpg",
  headphones: "/images/headphones.jpg",
  earphone: "/images/headphones.jpg",
  earphones: "/images/headphones.jpg",
  audio: "/images/headphones.jpg",

  laptop: "/images/laptop.jpg",
  computer: "/images/laptop.jpg",
  notebook: "/images/laptop.jpg",
  device: "/images/laptop.jpg",
}

export async function generateProductImage(description: string): Promise<string> {
  try {
    // Convert description to lowercase for matching
    const lowerDescription = description.toLowerCase()

    // Find matching product image
    for (const [keyword, imagePath] of Object.entries(PRODUCT_IMAGE_MAP)) {
      if (lowerDescription.includes(keyword)) {
        return imagePath
      }
    }

    // If no specific match, return generic product image
    return "/images/generic-product.jpg"
  } catch (error) {
    console.error("Error generating image:", error)
    // Fallback to a simple placeholder
    return `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(description)}`
  }
}
