export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          features: string[]
          benefits: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          features: string[]
          benefits: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          features?: string[]
          benefits?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      target_audiences: {
        Row: {
          id: string
          product_id: string
          age_range: string | null
          interests: string[] | null
          pain_points: string[] | null
          location: string | null
          gender: string | null
          income_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          age_range?: string | null
          interests?: string[] | null
          pain_points?: string[] | null
          location?: string | null
          gender?: string | null
          income_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          age_range?: string | null
          interests?: string[] | null
          pain_points?: string[] | null
          location?: string | null
          gender?: string | null
          income_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      generated_ads: {
        Row: {
          id: string
          product_id: string
          headline: string
          caption: string
          image_url: string | null
          prompt_used: string | null
          performance_score: number | null
          is_published: boolean
          platform: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          headline: string
          caption: string
          image_url?: string | null
          prompt_used?: string | null
          performance_score?: number | null
          is_published?: boolean
          platform?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          headline?: string
          caption?: string
          image_url?: string | null
          prompt_used?: string | null
          performance_score?: number | null
          is_published?: boolean
          platform?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
