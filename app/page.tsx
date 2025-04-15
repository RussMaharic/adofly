import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Users, DollarSign, ArrowRight } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your ad campaigns and performance</p>
        </div>
        <Link href="/create-ad">
          <Button className="bg-black text-white hover:bg-gray-800">Create New Ad</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
                <h3 className="text-3xl font-bold mt-2">12</h3>
                <p className="text-sm text-green-600 mt-1">+2 from last month</p>
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Ads</p>
                <h3 className="text-3xl font-bold mt-2">24</h3>
                <p className="text-sm text-green-600 mt-1">+8 from last month</p>
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reach</p>
                <h3 className="text-3xl font-bold mt-2">132.5k</h3>
                <p className="text-sm text-green-600 mt-1">+18.2% from last month</p>
              </div>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Ad Spend</p>
                <h3 className="text-3xl font-bold mt-2">$4,325</h3>
                <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
              </div>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium">Ad Performance</h3>
            <p className="text-sm text-gray-500">Impressions and conversions over the last 30 days</p>
            <div className="h-[300px] mt-4 flex items-center justify-center text-gray-400">
              Chart placeholder - Ad performance data
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium">Top Performing Ads</h3>
            <p className="text-sm text-gray-500">Your best performing ads by conversion rate</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <span className="text-sm font-medium">Ad 1</span>
                  </div>
                  <div>
                    <p className="font-medium">Summer Sale Promotion 1</p>
                    <p className="text-sm text-gray-500">4.5% • 10000 impressions</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <span className="text-sm font-medium">Ad 2</span>
                  </div>
                  <div>
                    <p className="font-medium">Summer Sale Promotion 2</p>
                    <p className="text-sm text-gray-500">4.2% • 8000 impressions</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
