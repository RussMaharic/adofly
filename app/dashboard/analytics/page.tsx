import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PerformanceMetricsChart } from "@/components/dashboard/performance-metrics-chart"
import { AudienceInsightsChart } from "@/components/dashboard/audience-insights-chart"
import { CampaignComparisonTable } from "@/components/dashboard/campaign-comparison-table"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed insights and performance metrics for your ad campaigns</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Select defaultValue="30days">
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

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="comparison">Campaign Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="pt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key metrics for your ad campaigns over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PerformanceMetricsChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">+12% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.8% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">+0.3% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cost per Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.45</div>
                <p className="text-xs text-muted-foreground">-$1.20 from previous period</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="pt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>Demographic and behavioral data about your audience</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AudienceInsightsChart />
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
                  {[
                    { age: "18-24", percentage: 15 },
                    { age: "25-34", percentage: 32 },
                    { age: "35-44", percentage: 28 },
                    { age: "45-54", percentage: 18 },
                    { age: "55+", percentage: 7 },
                  ].map((item) => (
                    <div key={item.age} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.age}</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top locations of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { location: "United States", percentage: 42 },
                    { location: "United Kingdom", percentage: 18 },
                    { location: "Canada", percentage: 15 },
                    { location: "Australia", percentage: 12 },
                    { location: "Germany", percentage: 8 },
                    { location: "Other", percentage: 5 },
                  ].map((item) => (
                    <div key={item.location} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.location}</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Comparison</CardTitle>
              <CardDescription>Compare performance across different campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignComparisonTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
