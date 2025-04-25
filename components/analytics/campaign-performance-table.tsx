"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Linkedin, Search, ArrowUpDown } from "lucide-react"

interface Campaign {
  id: string
  name: string
  platform: string
  status: string
  spend: string
  impressions: string
  clicks: string
  ctr: string
  conversions: string
  cpa: string
}

const campaigns: Campaign[] = [
  {
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
  },
  {
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
  },
  {
    id: "3",
    name: "Brand Awareness",
    platform: "Twitter",
    status: "Paused",
    spend: "$650",
    impressions: "18,500",
    clicks: "420",
    ctr: "2.27%",
    conversions: "35",
    cpa: "$18.57",
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
    conversions: "0",
    cpa: "$0.00",
  },
  {
    id: "5",
    name: "Holiday Special",
    platform: "Facebook",
    status: "Ended",
    spend: "$2,500",
    impressions: "78,500",
    clicks: "2,350",
    ctr: "2.99%",
    conversions: "210",
    cpa: "$11.90",
  },
  {
    id: "6",
    name: "Spring Collection",
    platform: "Instagram",
    status: "Active",
    spend: "$1,800",
    impressions: "52,000",
    clicks: "1,560",
    ctr: "3.00%",
    conversions: "145",
    cpa: "$12.41",
  },
  {
    id: "7",
    name: "Flash Sale",
    platform: "Twitter",
    status: "Ended",
    spend: "$750",
    impressions: "22,000",
    clicks: "660",
    ctr: "3.00%",
    conversions: "55",
    cpa: "$13.64",
  },
  {
    id: "8",
    name: "Professional Services",
    platform: "LinkedIn",
    status: "Active",
    spend: "$1,500",
    impressions: "18,000",
    clicks: "540",
    ctr: "3.00%",
    conversions: "48",
    cpa: "$31.25",
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

interface CampaignPerformanceTableProps {
  showAll?: boolean
}

export function CampaignPerformanceTable({ showAll = false }: CampaignPerformanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Campaign | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortField) return 0

      // Handle numeric fields with special formatting
      if (sortField === "spend" || sortField === "cpa") {
        const aValue = Number.parseFloat(a[sortField].replace(/[$,]/g, ""))
        const bValue = Number.parseFloat(b[sortField].replace(/[$,]/g, ""))
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (sortField === "impressions" || sortField === "clicks" || sortField === "conversions") {
        const aValue = Number.parseInt(a[sortField].replace(/,/g, ""))
        const bValue = Number.parseInt(b[sortField].replace(/,/g, ""))
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (sortField === "ctr") {
        const aValue = Number.parseFloat(a[sortField].replace("%", ""))
        const bValue = Number.parseFloat(b[sortField].replace("%", ""))
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      // Handle string fields
      const aValue = a[sortField]
      const bValue = b[sortField]
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

  const displayedCampaigns = showAll ? filteredCampaigns : filteredCampaigns.slice(0, 5)

  return (
    <div className="space-y-4">
      {showAll && (
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("name")}>
                  <span>Campaign</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("platform")}>
                  <span>Platform</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("status")}>
                  <span>Status</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("spend")}>
                  <span>Spend</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("impressions")}>
                  <span>Impressions</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("clicks")}>
                  <span>Clicks</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("ctr")}>
                  <span>CTR</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("conversions")}>
                  <span>Conv.</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("cpa")}>
                  <span>CPA</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCampaigns.length > 0 ? (
              displayedCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getPlatformIcon(campaign.platform)}
                      <span>{campaign.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)} variant="outline">
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{campaign.spend}</TableCell>
                  <TableCell className="text-right">{campaign.impressions}</TableCell>
                  <TableCell className="text-right">{campaign.clicks}</TableCell>
                  <TableCell className="text-right">{campaign.ctr}</TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">{campaign.cpa}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
