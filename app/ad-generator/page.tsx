"use client"

import { useState } from "react"
import { AdGeneratorForm } from "@/components/ad-generator-form"
import { AdPreview } from "@/components/ad-preview"

export default function AdGeneratorPage() {
  const [generatedAd, setGeneratedAd] = useState(null)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Ad Generator</h1>
        <p className="text-muted-foreground">
          Create compelling ads for your products using AI. Fill in the details below and our AI will generate an
          optimized ad for your target audience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Ad Information</h2>
          <AdGeneratorForm onAdGenerated={setGeneratedAd} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview & Publish</h2>
          <AdPreview ad={generatedAd} />
        </div>
      </div>
    </div>
  )
}
