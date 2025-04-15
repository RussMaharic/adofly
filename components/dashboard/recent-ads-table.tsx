"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockAds = [
  {
    id: "ad1",
    name: "Summer Sale Promotion",
    status: "active",
    platform: "Facebook",
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
    impressions: 9800,
    clicks: 380,
    ctr: "3.9%",
    spend: "$290.45",
    createdAt: "2023-06-08",
  },
]

export function RecentAdsTable() {
  const [ads] = useState(mockAds)

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="hidden md:table-cell">Impressions</TableHead>
            <TableHead className="hidden md:table-cell">Clicks</TableHead>
            <TableHead className="hidden md:table-cell">CTR</TableHead>
            <TableHead>Spend</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell className="font-medium">{ad.name}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(ad.status)}>
                  {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{ad.platform}</TableCell>
              <TableCell className="hidden md:table-cell">{ad.impressions.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">{ad.clicks.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">{ad.ctr}</TableCell>
              <TableCell>{ad.spend}</TableCell>
              <TableCell className="hidden md:table-cell">{ad.createdAt}</TableCell>
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Pause</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
