"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"

const funnelData = [
  { stage: "Impressions", count: 120000 },
  { stage: "Clicks", count: 7800 },
  { stage: "Page Views", count: 5400 },
  { stage: "Add to Cart", count: 1800 },
  { stage: "Checkout", count: 900 },
  { stage: "Purchase", count: 720 },
]

export function ConversionFunnel() {
  const { theme } = useTheme()

  const color = theme === "dark" ? "#adfa1d" : "#0ea5e9"

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={funnelData} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={100} />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()}`, "Count"]}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              }}
            />
            <Bar dataKey="count" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Click-through Rate</h3>
            <p className="text-2xl font-bold">6.5%</p>
            <p className="text-sm text-muted-foreground">Impressions to Clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Conversion Rate</h3>
            <p className="text-2xl font-bold">9.2%</p>
            <p className="text-sm text-muted-foreground">Clicks to Purchase</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Cart Abandonment</h3>
            <p className="text-2xl font-bold">50.0%</p>
            <p className="text-sm text-muted-foreground">Add to Cart to Purchase</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Conversion Rates Between Stages</h3>
        <div className="space-y-2">
          {funnelData.slice(0, -1).map((item, index) => {
            const nextStage = funnelData[index + 1]
            const conversionRate = ((nextStage.count / item.count) * 100).toFixed(1)
            const dropoffRate = (100 - Number.parseFloat(conversionRate)).toFixed(1)

            return (
              <div key={item.stage} className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {item.stage} → {nextStage.stage}
                  </span>
                  <span className="text-sm font-medium">{conversionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${conversionRate}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Converted: {nextStage.count.toLocaleString()}</span>
                  <span>
                    Dropped: {(item.count - nextStage.count).toLocaleString()} ({dropoffRate}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
