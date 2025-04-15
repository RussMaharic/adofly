"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, PauseCircle, PlayCircle, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Mock data for ads
const allAds = [
  {
    id: "ad1",
    name: "Summer Sale Promotion",
    status: "active",
    platform: "Facebook",
    audience: "25-45, US, Shopping Interests",
    impressions: 12500,
    clicks: 450,
    ctr: "3.6%",
    spend: "$320.50",
    createdAt: "2023-06-15",
  },
  {
    id: "ad2",
    name: "New Product Launch",
    status: "active",
    platform: "Instagram",
    audience: "18-35, Global, Tech Enthusiasts",
    impressions: 8700,
    clicks: 320,
    ctr: "3.7%",
    spend: "$250.75",
    createdAt: "2023-06-12",
  },
  {
    id: "ad3",
    name: "Holiday Special Offer",
    status: "pending",
    platform: "Facebook",
    audience: "25-55, US, CA, UK",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    spend: "$0.00",
    createdAt: "2023-06-10",
  },
  {
    id: "ad4",
    name: "Brand Awareness Campaign",
    status: "completed",
    platform: "Instagram",
    audience: "18-45, Global",
    impressions: 15200,
    clicks: 520,
    ctr: "3.4%",
    spend: "$420.30",
    createdAt: "2023-05-28",
  },
  {
    id: "ad5",
    name: "Flash Sale Weekend",
    status: "active",
    platform: "Facebook",
    audience: "25-45, US, Shopping Interests",
    impressions: 9800,
    clicks: 380,
    ctr: "3.9%",
    spend: "$290.45",
    createdAt: "2023-06-08",
  },
  {
    id: "ad6",
    name: "Seasonal Collection Showcase",
    status: "active",
    platform: "Instagram",
    audience: "18-35, Fashion Enthusiasts",
    impressions: 7200,
    clicks: 280,
    ctr: "3.9%",
    spend: "$210.20",
    createdAt: "2023-06-05",
  },
  {
    id: "ad7",
    name: "Limited Time Discount",
    status: "pending",
    platform: "Facebook",
    audience: "25-55, US, CA",
    impressions: 0,
    clicks: 0,
    ctr: "0%",
    spend: "$0.00",
    createdAt: "2023-06-02",
  },
  {
    id: "ad8",
    name: "Customer Loyalty Program",
    status: "completed",
    platform: "Facebook",
    audience: "25-65, Existing Customers",
    impressions: 6500,
    clicks: 210,
    ctr: "3.2%",
    spend: "$180.75",
    createdAt: "2023-05-20",
  },
]

interface AdsListProps {
  status: "all" | "active" | "pending" | "completed"
}

export function AdsList({ status }: AdsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter ads based on status and search term
  const filteredAds = allAds.filter((ad) => {
    const matchesStatus = status === "all" || ad.status === status
    const matchesSearch =
      ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.platform.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "pending":
        return "warning"
      case "completed":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search ads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="hidden md:table-cell">Audience</TableHead>
              <TableHead className="hidden lg:table-cell">Impressions</TableHead>
              <TableHead className="hidden lg:table-cell">CTR</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No ads found. Try adjusting your search or create a new ad.
                </TableCell>
              </TableRow>
            ) : (
              filteredAds.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(ad.status)}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{ad.platform}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate" title={ad.audience}>
                    {ad.audience}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{ad.impressions.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell">{ad.ctr}</TableCell>
                  <TableCell>{ad.spend}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/dashboard/ads/${ad.id}`} className="flex w-full items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        {ad.status === "active" && (
                          <DropdownMenuItem>
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Pause Campaign
                          </DropdownMenuItem>
                        )}
                        {ad.status === "pending" && (
                          <DropdownMenuItem>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Activate Campaign
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
