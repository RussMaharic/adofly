"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdContent {
  title: string
  description: string
  primaryText: string
  headline: string
  linkDescription: string
  targetAudience: string
  objective: string
}

interface AdPreviewProps {
  adContent: AdContent
}

export function AdPreview({ adContent }: AdPreviewProps) {
  return (
    <Tabs defaultValue="facebook">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="facebook">Facebook</TabsTrigger>
        <TabsTrigger value="instagram">Instagram</TabsTrigger>
      </TabsList>
      <TabsContent value="facebook" className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="border rounded-lg overflow-hidden max-w-md mx-auto">
              <div className="bg-[#f0f2f5] p-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="font-semibold text-sm">Your Business Page</p>
                    <p className="text-xs text-gray-500">
                      Sponsored · <span className="text-gray-500">🌎</span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{adContent.primaryText || "Your primary text will appear here."}</p>
              </div>
              <div className="bg-gray-200 h-52 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Ad Image</p>
              </div>
              <div className="bg-white p-3 border-t">
                <p className="font-semibold text-sm text-[#385898]">YOUR-WEBSITE.COM</p>
                <p className="font-bold text-sm">{adContent.headline || "Your headline will appear here."}</p>
                <p className="text-xs text-gray-500">{adContent.description || "Your description will appear here."}</p>
                <button className="mt-2 w-full bg-[#e7f3ff] text-[#0866ff] py-1 px-2 rounded text-sm font-semibold">
                  {adContent.linkDescription || "Learn More"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="instagram" className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="border rounded-lg overflow-hidden max-w-md mx-auto">
              <div className="bg-white p-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">yourbusiness</p>
                    <p className="text-xs text-gray-500">Sponsored</p>
                  </div>
                  <div className="text-gray-500">•••</div>
                </div>
              </div>
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Ad Image</p>
              </div>
              <div className="bg-white p-3">
                <div className="flex gap-4 mb-2">
                  <div className="flex gap-2">
                    <div className="h-6 w-6 text-center">❤️</div>
                    <div className="h-6 w-6 text-center">💬</div>
                    <div className="h-6 w-6 text-center">📤</div>
                  </div>
                  <div className="flex-1"></div>
                  <div className="h-6 w-6 text-center">🔖</div>
                </div>
                <p className="text-sm font-semibold">yourbusiness</p>
                <p className="text-sm">{adContent.primaryText || "Your primary text will appear here."}</p>
                <p className="text-sm text-blue-900 font-medium mt-1">
                  {adContent.headline || "Your headline will appear here."}
                </p>
                <button className="mt-2 w-full bg-[#0095f6] text-white py-1.5 px-2 rounded text-sm font-semibold">
                  {adContent.linkDescription || "Learn More"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
