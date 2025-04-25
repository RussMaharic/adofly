import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"

const campaigns = [
  {
    id: "1",
    name: "Summer Sale Promotion",
    platform: "Facebook",
    status: "Active",
    spend: "$1,200",
    impressions: "45.2K",
    clicks: "1.2K",
    ctr: "2.65%",
    image: "/abstract-geometric-shapes.png",
  },
  {
    id: "2",
    name: "New Product Launch",
    platform: "Instagram",
    status: "Active",
    spend: "$950",
    impressions: "32.8K",
    clicks: "980",
    ctr: "2.99%",
    image: "/assorted-products-display.png",
  },
  {
    id: "3",
    name: "Brand Awareness",
    platform: "Twitter",
    status: "Paused",
    spend: "$650",
    impressions: "18.5K",
    clicks: "420",
    ctr: "2.27%",
    image: "/abstract-brand-identity.png",
  },
  {
    id: "4",
    name: "B2B Lead Generation",
    platform: "LinkedIn",
    status: "Scheduled",
    spend: "$0",
    impressions: "0",
    clicks: "0",
    ctr: "0%",
    image: "/global-business-network.png",
  },
]

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Facebook":
      return <Facebook className="h-4 w-4" />
    case "Instagram":
      return <Instagram className="h-4 w-4" />
    case "Twitter":
      return <Twitter className="h-4 w-4" />
    case "LinkedIn":
      return <Linkedin className="h-4 w-4" />
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

export function RecentCampaigns() {
  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={campaign.image || "/placeholder.svg"} alt={campaign.name} />
              <AvatarFallback>{campaign.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{campaign.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  {getPlatformIcon(campaign.platform)}
                  <span className="ml-1">{campaign.platform}</span>
                </div>
                <Badge className={getStatusColor(campaign.status)} variant="outline">
                  {campaign.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="w-20 text-right">
              <p className="font-medium">{campaign.spend}</p>
              <p className="text-xs text-muted-foreground">Spend</p>
            </div>
            <div className="w-20 text-right">
              <p className="font-medium">{campaign.impressions}</p>
              <p className="text-xs text-muted-foreground">Impressions</p>
            </div>
            <div className="w-16 text-right">
              <p className="font-medium">{campaign.clicks}</p>
              <p className="text-xs text-muted-foreground">Clicks</p>
            </div>
            <div className="w-16 text-right">
              <p className="font-medium">{campaign.ctr}</p>
              <p className="text-xs text-muted-foreground">CTR</p>
            </div>
          </div>
          <Link href={`/dashboard/campaigns/${campaign.id}`}>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
