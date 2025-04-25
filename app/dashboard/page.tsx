import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdPerformanceMetrics } from "@/components/dashboard/ad-performance-metrics"
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns"
import { PlatformDistribution } from "@/components/dashboard/platform-distribution"
import { CampaignOverview } from "@/components/dashboard/campaign-overview"
import { Plus, BarChart2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex space-x-2">
          <Link href="/dashboard/generate">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Ad
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdPerformanceMetrics />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CampaignOverview />
        </div>
        <div>
          <PlatformDistribution />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Recent Campaigns</CardTitle>
              <Link href="/dashboard/campaigns">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentCampaigns />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Performance Trends</CardTitle>
              <CardDescription>Your ad performance over time</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Click-through Rate</p>
                  <p className="text-2xl font-bold">2.8%</p>
                </div>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+0.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                </div>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+0.7%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cost per Acquisition</p>
                  <p className="text-2xl font-bold">$24.80</p>
                </div>
                <div className="flex items-center text-red-500">
                  <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                  <span className="text-sm">-$1.20</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
