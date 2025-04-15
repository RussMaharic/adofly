import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdsList } from "@/components/dashboard/ads-list"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ad Campaigns</h2>
          <p className="text-muted-foreground">Manage and monitor all your ad campaigns</p>
        </div>
        <Link href="/dashboard/create-ad">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Ad
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Ads</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Ad Campaigns</CardTitle>
              <CardDescription>View and manage all your ad campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <AdsList status="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Currently running ad campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <AdsList status="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Campaigns awaiting approval from Meta</CardDescription>
            </CardHeader>
            <CardContent>
              <AdsList status="pending" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Campaigns</CardTitle>
              <CardDescription>Past campaigns that have ended</CardDescription>
            </CardHeader>
            <CardContent>
              <AdsList status="completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
