import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CampaignPerformanceTable } from "@/components/analytics/campaign-performance-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <Link href="/dashboard/generate">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Campaign
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>View and manage all your ad campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignPerformanceTable showAll />
        </CardContent>
      </Card>
    </div>
  )
}
