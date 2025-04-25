"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const platformData = [
  {
    name: "Facebook",
    impressions: 120000,
    clicks: 3600,
    conversions: 360,
    spend: 1800,
    ctr: 3.0,
    cvr: 10.0,
    cpa: 5.0,
  },
  {
    name: "Instagram",
    impressions: 85000,
    clicks: 2550,
    conversions: 230,
    spend: 1275,
    ctr: 3.0,
    cvr: 9.0,
    cpa: 5.54,
  },
  {
    name: "Twitter",
    impressions: 40000,
    clicks: 1080,
    conversions: 90,
    spend: 650,
    ctr: 2.7,
    cvr: 8.3,
    cpa: 7.22,
  },
  {
    name: "LinkedIn",
    impressions: 18000,
    clicks: 540,
    conversions: 48,
    spend: 1500,
    ctr: 3.0,
    cvr: 8.9,
    cpa: 31.25,
  },
]

interface PlatformPerformanceChartProps {
  detailed?: boolean
}

export function PlatformPerformanceChart({ detailed = false }: PlatformPerformanceChartProps) {
  const { theme } = useTheme()

  const colors =
    theme === "dark" ? ["#adfa1d", "#1e40af", "#7e22ce", "#be185d"] : ["#0ea5e9", "#3b82f6", "#8b5cf6", "#ec4899"]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="impressions">
        <TabsList>
          <TabsTrigger value="impressions">Impressions</TabsTrigger>
          <TabsTrigger value="clicks">Clicks</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="spend">Spend</TabsTrigger>
          {detailed && (
            <>
              <TabsTrigger value="ctr">CTR</TabsTrigger>
              <TabsTrigger value="cvr">CVR</TabsTrigger>
              <TabsTrigger value="cpa">CPA</TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="impressions">
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Impressions"]}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                />
                <Bar dataKey="impressions" fill={colors[0]} name="Impressions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="clicks">
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Clicks"]}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                />
                <Bar dataKey="clicks" fill={colors[1]} name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="conversions">
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}`, "Conversions"]}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                />
                <Bar dataKey="conversions" fill={colors[2]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="spend">
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Spend"]}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                />
                <Bar dataKey="spend" fill={colors[3]} name="Spend" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        {detailed && (
          <>
            <TabsContent value="ctr">
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value.toFixed(2)}%`, "CTR"]}
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      }}
                    />
                    <Bar dataKey="ctr" fill={colors[0]} name="CTR" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="cvr">
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value.toFixed(2)}%`, "CVR"]}
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      }}
                    />
                    <Bar dataKey="cvr" fill={colors[1]} name="CVR" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="cpa">
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toFixed(2)}`, "CPA"]}
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      }}
                    />
                    <Bar dataKey="cpa" fill={colors[2]} name="CPA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

      {detailed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {platformData.map((platform) => (
            <Card key={platform.name}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Impressions</span>
                    <span className="text-sm font-medium">{platform.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Clicks</span>
                    <span className="text-sm font-medium">{platform.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conversions</span>
                    <span className="text-sm font-medium">{platform.conversions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Spend</span>
                    <span className="text-sm font-medium">${platform.spend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CTR</span>
                    <span className="text-sm font-medium">{platform.ctr.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CVR</span>
                    <span className="text-sm font-medium">{platform.cvr.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CPA</span>
                    <span className="text-sm font-medium">${platform.cpa.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
