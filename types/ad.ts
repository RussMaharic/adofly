export interface GeneratedAd {
  id: string
  name: string
  headline: string
  caption: string
  imageUrl: string
  platform: string
  isPublished: boolean
  createdAt: string
  performanceScore?: number
  engagementMetrics?: {
    likes: number
    comments: number
    shares: number
  }
}

export interface Product {
  id: string
  name: string
  description: string
  features: string[]
  benefits: string[]
}

export interface TargetAudience {
  ageRange: string
  interests: string[]
  painPoints: string[]
  location: string
  gender: string
  incomeLevel: string
}
