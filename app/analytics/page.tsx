"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Mock analytics data generator
const generateAnalyticsData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      impressions: Math.floor(Math.random() * 5000),
      clicks: Math.floor(Math.random() * 300),
      conversions: Math.floor(Math.random() * 50),
      cpc: Number.parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
    })
  }

  return data
}

// Audience data generator
const generateAudienceData = () => {
  return [
    {
      age: "18-24",
      male: Math.floor(Math.random() * 20),
      female: Math.floor(Math.random() * 20),
      other: Math.floor(Math.random() * 3),
    },
    {
      age: "25-34",
      male: Math.floor(Math.random() * 30) + 10,
      female: Math.floor(Math.random() * 30) + 10,
      other: Math.floor(Math.random() * 5),
    },
    {
      age: "35-44",
      male: Math.floor(Math.random() * 25) + 5,
      female: Math.floor(Math.random() * 25) + 5,
      other: Math.floor(Math.random() * 3),
    },
    {
      age: "45-54",
      male: Math.floor(Math.random() * 20),
      female: Math.floor(Math.random() * 20),
      other: Math.floor(Math.random() * 2),
    },
    {
      age: "55-64",
      male: Math.floor(Math.random() * 15),
      female: Math.floor(Math.random() * 15),
      other: Math.floor(Math.random() * 2),
    },
    {
      age: "65+",
      male: Math.floor(Math.random() * 10),
      female: Math.floor(Math.random() * 10),
      other: Math.floor(Math.random() * 1),
    },
  ]
}

// Mock campaign comparison data
const generateCampaignData = () => {
  return [
    {
      id: 1,
      name: "Summer Sale Promotion",
      platform: "Facebook",
      impressions: 12500,
      clicks: 450,
      ctr: "3.6%",
      conversions: 85,
      convRate: "18.9%",
      cpc: "$0.71",
      spend: "$320.50",
      roi: "215%",
    },
    {
      id: 2,
      name: "New Product Launch",
      platform: "Instagram",
      impressions: 8700,
      clicks: 320,
      ctr: "3.7%",
      conversions: 62,
      convRate: "19.4%",
      cpc: "$0.78",
      spend: "$250.75",
      roi: "185%",
    },
    {
      id: 3,
      name: "Brand Awareness Campaign",
      platform: "Instagram",
      impressions: 15200,
      clicks: 520,
      ctr: "3.4%",
      conversions: 95,
      convRate: "18.3%",
      cpc: "$0.81",
      spend: "$420.30",
      roi: "165%",
    },
    {
      id: 4,
      name: "Flash Sale Weekend",
      platform: "Facebook",
      impressions: 9800,
      clicks: 380,
      ctr: "3.9%",
      conversions: 78,
      convRate: "20.5%",
      cpc: "$0.76",
      spend: "$290.45",
      roi: "225%",
    },
    {
      id: 5,
      name: "Seasonal Collection Showcase",
      platform: "Instagram",
      impressions: 7200,
      clicks: 280,
      ctr: "3.9%",
      conversions: 55,
      convRate: "19.6%",
      cpc: "$0.75",
      spend: "$210.20",
      roi: "195%",
    },
  ]
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("performance")
  const [timeRange, setTimeRange] = useState("30days")
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [audienceData, setAudienceData] = useState<any[]>([])
  const [campaignData, setCampaignData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Load analytics data on component mount and time range change
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)

    try {
      // Get days from selected time range
      const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : timeRange === "90days" ? 90 : 365

      // Generate mock data
      const newPerformanceData = generateAnalyticsData(days)
      const newAudienceData = generateAudienceData()
      const newCampaignData = generateCampaignData()

      // Set data with a small delay to simulate loading
      setTimeout(() => {
        setPerformanceData(newPerformanceData)
        setAudienceData(newAudienceData)
        setCampaignData(newCampaignData)
        setIsLoading(false)
      }, 500)
    } catch (error) {
      setHasError(true)
      setIsLoading(false)
    }
  }, [timeRange])

  // Calculate summary metrics
  const totalImpressions = performanceData.reduce((sum, day) => sum + day.impressions, 0)
  const totalClicks = performanceData.reduce((sum, day) => sum + day.clicks, 0)
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0"
  const totalConversions = performanceData.reduce((sum, day) => sum + day.conversions, 0)
  const avgCpc =
    totalClicks > 0
      ? (performanceData.reduce((sum, day) => sum + day.cpc, 0) / performanceData.length).toFixed(2)
      : "0.00"

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed insights and performance metrics for your ad campaigns</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="comparison">Campaign Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="pt-4 space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </CardContent>
            </Card>
          ) : hasError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>There was an error loading analytics data. Please try again later.</AlertDescription>
            </Alert>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key metrics for your ad campaigns over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {/* Chart would go here - using placeholder */}
                  <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Performance Chart</p>
                      <p className="text-sm text-muted-foreground">Data points: {performanceData.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgCtr}%</div>
                    <p className="text-xs text-muted-foreground">+0.8% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+0.3% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Cost per Click</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${avgCpc}</div>
                    <p className="text-xs text-muted-foreground">-$0.15 from previous period</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="audience" className="pt-4 space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </CardContent>
            </Card>
          ) : hasError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>There was an error loading audience data. Please try again later.</AlertDescription>
            </Alert>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Audience Insights</CardTitle>
                  <CardDescription>Demographic and behavioral data about your audience</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {/* Chart would go here - using placeholder */}
                  <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Audience Demographics Chart</p>
                      <p className="text-sm text-muted-foreground">Data points: {audienceData.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                    <CardDescription>Breakdown of your audience by age group</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {audienceData.map((item) => (
                        <div key={item.age} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.age}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.male + item.female + item.other}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.male + item.female + item.other}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                    <CardDescription>Breakdown of your audience by gender</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Male", "Female", "Other"].map((gender, index) => {
                        const total = audienceData.reduce(
                          (sum, item) =>
                            sum +
                            (gender.toLowerCase() === "male"
                              ? item.male
                              : gender.toLowerCase() === "female"
                                ? item.female
                                : item.other),
                          0,
                        )
                        return (
                          <div key={gender} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{gender}</span>
                              <span className="text-sm text-muted-foreground">{total}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className={`h-2 rounded-full ${
                                  index === 0 ? "bg-blue-500" : index === 1 ? "bg-pink-500" : "bg-purple-500"
                                }`}
                                style={{ width: `${total}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="comparison" className="pt-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 flex justify-center items-center">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </CardContent>
            </Card>
          ) : hasError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading campaign comparison data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Campaign Comparison</CardTitle>
                <CardDescription>Compare performance across different campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Campaign</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Platform</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Impressions
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">CTR</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Conversions
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                          Conv. Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Spend</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">ROI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {campaignData.map((campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{campaign.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.platform}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.impressions.toLocaleString()}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.ctr}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.conversions}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.convRate}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{campaign.spend}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-green-600 font-medium">{campaign.roi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
