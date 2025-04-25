import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, MousePointer, BarChart } from "lucide-react"

const metrics = [
  {
    title: "Total Spend",
    value: "$12,543.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Impressions",
    value: "1.2M",
    change: "+18.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Clicks",
    value: "32,840",
    change: "+7.4%",
    trend: "up",
    icon: MousePointer,
  },
  {
    title: "Conversions",
    value: "1,054",
    change: "+4.6%",
    trend: "up",
    icon: BarChart,
  },
]

export function AdPerformanceMetrics() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
