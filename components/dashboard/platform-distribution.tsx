"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { name: "Facebook", value: 45 },
  { name: "Instagram", value: 30 },
  { name: "Twitter", value: 15 },
  { name: "LinkedIn", value: 10 },
]

export function PlatformDistribution() {
  const { theme } = useTheme()

  const COLORS =
    theme === "dark" ? ["#adfa1d", "#1e40af", "#7e22ce", "#be185d"] : ["#0ea5e9", "#3b82f6", "#8b5cf6", "#ec4899"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((platform, index) => (
            <div key={platform.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-sm">{platform.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
