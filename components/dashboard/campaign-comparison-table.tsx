"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const campaignData = [
  {
    id: 1,
    name: "Summer Sale Promotion",
    platform: "Facebook",
    impressions: 12500,
    clicks: 450,
    ctr: "3.6%",
    conversions: 85,
    convRate: "18.9%",
    cpc: "$0.71",
    spend: "$320.50",
    roi: "215%",
  },
  {
    id: 2,
    name: "New Product Launch",
    platform: "Instagram",
    impressions: 8700,
    clicks: 320,
    ctr: "3.7%",
    conversions: 62,
    convRate: "19.4%",
    cpc: "$0.78",
    spend: "$250.75",
    roi: "185%",
  },
  {
    id: 3,
    name: "Brand Awareness Campaign",
    platform: "Instagram",
    impressions: 15200,
    clicks: 520,
    ctr: "3.4%",
    conversions: 95,
    convRate: "18.3%",
    cpc: "$0.81",
    spend: "$420.30",
    roi: "165%",
  },
  {
    id: 4,
    name: "Flash Sale Weekend",
    platform: "Facebook",
    impressions: 9800,
    clicks: 380,
    ctr: "3.9%",
    conversions: 78,
    convRate: "20.5%",
    cpc: "$0.76",
    spend: "$290.45",
    roi: "225%",
  },
  {
    id: 5,
    name: "Seasonal Collection Showcase",
    platform: "Instagram",
    impressions: 7200,
    clicks: 280,
    ctr: "3.9%",
    conversions: 55,
    convRate: "19.6%",
    cpc: "$0.75",
    spend: "$210.20",
    roi: "195%",
  },
]

export function CampaignComparisonTable() {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Impressions</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>CTR</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead>Conv. Rate</TableHead>
            <TableHead>CPC</TableHead>
            <TableHead>Spend</TableHead>
            <TableHead>ROI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaignData.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{campaign.platform}</Badge>
              </TableCell>
              <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
              <TableCell>{campaign.ctr}</TableCell>
              <TableCell>{campaign.conversions}</TableCell>
              <TableCell>{campaign.convRate}</TableCell>
              <TableCell>{campaign.cpc}</TableCell>
              <TableCell>{campaign.spend}</TableCell>
              <TableCell className="font-medium text-green-600">{campaign.roi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
