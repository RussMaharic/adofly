"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { date: "Jan 1", spend: 1200, impressions: 15000, clicks: 300 },
  { date: "Jan 8", spend: 1400, impressions: 18000, clicks: 350 },
  { date: "Jan 15", spend: 1300, impressions: 17000, clicks: 320 },
  { date: "Jan 22", spend: 1500, impressions: 21000, clicks: 380 },
  { date: "Jan 29", spend: 1800, impressions: 25000, clicks: 420 },
  { date: "Feb 5", spend: 2000, impressions: 28000, clicks: 450 },
  { date: "Feb 12", spend: 2200, impressions: 30000, clicks: 500 },
  { date: "Feb 19", spend: 2400, impressions: 32000, clicks: 550 },
  { date: "Feb 26", spend: 2300, impressions: 31000, clicks: 530 },
  { date: "Mar 5", spend: 2500, impressions: 33000, clicks: 580 },
  { date: "Mar 12", spend: 2700, impressions: 35000, clicks: 620 },
  { date: "Mar 19", spend: 2900, impressions: 38000, clicks: 650 },
]

export function CampaignOverview() {
  const { theme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke={theme === "dark" ? "#888888" : "#333333"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={theme === "dark" ? "#888888" : "#333333"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Line type="monotone" dataKey="spend" stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"} strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke={theme === "dark" ? "#1e40af" : "#3b82f6"}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
