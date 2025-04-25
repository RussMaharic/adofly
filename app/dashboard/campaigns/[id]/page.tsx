"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdPreview } from "@/components/generate/ad-preview"
import { PlatformPerformanceChart } from "@/components/analytics/platform-performance-chart"
import { AudienceInsights } from "@/components/analytics/audience-insights"
import { ConversionFunnel } from "@/components/analytics/conversion-funnel"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Edit,
  Pause,
  Play,
  BarChart2,
  Users,
  DollarSign,
  MousePointer,
} from "lucide-react"
import Link from "next/link"

// Sample campaign data - in a real app, this would come from an API
const campaignData = {
  "1": {
    id: "1",
    name: "Summer Sale Promotion",
    platform: "Facebook",
    status: "Active",
    spend: "$1,200",
    impressions: "45,200",
    clicks: "1,200",
    ctr: "2.65%",
    conversions: "120",
    cpa: "$10.00",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    budget: "$50/day",
    targeting: "Adults 25-45, interested in fitness and wellness",
    adContent: {
      headline: "Summer Fitness Sale - Up to 50% Off!",
      description:
        "Get ready for summer with our biggest sale of the year. Premium fitness trackers and equipment at unbeatable prices. Limited time offer! 🏃‍♂️💪 #SummerFitness #SpecialOffer",
      callToAction: "Shop Now",
      imagePrompt: "Fitness equipment on beach, summer vibes",
    },
  },
  "2": {
    id: "2",
    name: "New Product Launch",
    platform: "Instagram",
    status: "Active",
    spend: "$950",
    impressions: "32,800",
    clicks: "980",
    ctr: "2.99%",
    conversions: "85",
    cpa: "$11.18",
    startDate: "2023-07-15",
    endDate: "2023-09-15",
    budget: "$40/day",
    targeting: "Adults 18-35, interested in technology and gadgets",
    adContent: {
      headline: "Introducing the Revolutionary FitTrack Pro",
      description:
        "Meet the future of fitness tracking. Advanced health metrics, 7-day battery life, and seamless app integration. Pre-order now for 20% off! ✨ #FitTrackPro #FitnessInnovation",
      callToAction: "Pre-order",
      imagePrompt: "Modern fitness tracker with glowing screen, futuristic",
    },
  },
}

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = params.id as string

  // In a real app, you would fetch this data from an API
  const campaign = campaignData[campaignId] || {
    id: campaignId,
    name: "Unknown Campaign",
    platform: "Facebook",
    status: "Unknown",
    adContent: null,
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return <Facebook className="h-5 w-5" />
      case "Instagram":
        return <Instagram className="h-5 w-5" />
      case "Twitter":
        return <Twitter className="h-5 w-5" />
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
            <Badge className={getStatusColor(campaign.status)} variant="outline">
              {campaign.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            {getPlatformIcon(campaign.platform)}
            <span>{campaign.platform}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/campaigns/${campaignId}/edit`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          {campaign.status === "Active" ? (
            <Button variant="outline" className="flex items-center gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          ) : campaign.status === "Paused" ? (
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Resume
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.impressions}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.clicks}</div>
            <p className="text-xs text-muted-foreground">+7.4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.conversions}</div>
            <p className="text-xs text-muted-foreground">+4.6% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.spend}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium">Status</dt>
                    <dd>
                      <Badge className={getStatusColor(campaign.status)} variant="outline">
                        {campaign.status}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Platform</dt>
                    <dd className="flex items-center gap-1">
                      {getPlatformIcon(campaign.platform)}
                      {campaign.platform}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Start Date</dt>
                    <dd>{campaign.startDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">End Date</dt>
                    <dd>{campaign.endDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Daily Budget</dt>
                    <dd>{campaign.budget}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Targeting</dt>
                    <dd className="text-right">{campaign.targeting}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium">Impressions</dt>
                    <dd>{campaign.impressions}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Clicks</dt>
                    <dd>{campaign.clicks}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Click-through Rate</dt>
                    <dd>{campaign.ctr}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Conversions</dt>
                    <dd>{campaign.conversions}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Cost per Acquisition</dt>
                    <dd>{campaign.cpa}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Spend</dt>
                    <dd>{campaign.spend}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformPerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creative" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Creative</CardTitle>
              <CardDescription>Preview of your ad as it appears on {campaign.platform}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <AdPreview
                  platform={campaign.platform.toLowerCase()}
                  adContent={campaign.adContent}
                  isLoading={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformPerformanceChart detailed />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversionFunnel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <AudienceInsights detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Manage your campaign settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Edit campaign settings functionality would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
