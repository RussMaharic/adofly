"use client"

import { useState } from "react"
import { AdGeneratorForm } from "@/components/ad-generator-form"
import { AdPreview } from "@/components/ad-preview"
import type { GeneratedAd } from "@/types/ad"

export default function CreateAdPage() {
  const [generatedAd, setGeneratedAd] = useState<GeneratedAd | null>(null)

  const handleAdGenerated = (ad: GeneratedAd) => {
    console.log("Ad generated:", ad)
    setGeneratedAd(ad)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Ad</h1>
      <p className="mb-6 text-muted-foreground">
        Create ads for your products using AI. Fill in the details below and our AI will generate an optimized ad for
        your target audience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ad Information</h2>
          <AdGeneratorForm onAdGenerated={handleAdGenerated} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Ad Preview</h2>
          <AdPreview ad={generatedAd} />
        </div>
      </div>
    </div>
  )
}
