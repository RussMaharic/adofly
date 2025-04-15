export type Product = {
  id: string
  user_id: string
  name: string
  description: string
  features: string[]
  benefits: string[]
  created_at: string
  updated_at: string
}

export type TargetAudience = {
  id: string
  product_id: string
  age_range: string
  interests: string[]
  pain_points: string[]
  location: string
  gender: string
  income_level: string
  created_at: string
  updated_at: string
}

export type GeneratedAd = {
  id: string
  product_id: string
  headline: string
  caption: string
  image_url: string
  prompt_used: string
  performance_score: number
  is_published: boolean
  platform: string | null
  created_at: string
  updated_at: string
}
