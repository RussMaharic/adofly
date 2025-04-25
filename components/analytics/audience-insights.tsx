"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ageData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 10 },
]

const genderData = [
  { name: "Male", value: 45 },
  { name: "Female", value: 52 },
  { name: "Other", value: 3 },
]

const locationData = [
  { name: "United States", value: 60 },
  { name: "Canada", value: 15 },
  { name: "United Kingdom", value: 10 },
  { name: "Australia", value: 8 },
  { name: "Other", value: 7 },
]

const interestData = [
  { name: "Fitness", value: 30 },
  { name: "Technology", value: 25 },
  { name: "Fashion", value: 15 },
  { name: "Travel", value: 20 },
  { name: "Food", value: 10 },
]

interface AudienceInsightsProps {
  detailed?: boolean
}

export function AudienceInsights({ detailed = false }: AudienceInsightsProps) {
  const { theme } = useTheme()

  const COLORS =
    theme === "dark"
      ? ["#adfa1d", "#1e40af", "#7e22ce", "#be185d", "#0891b2"]
      : ["#0ea5e9", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="age">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="age">Age</TabsTrigger>
          <TabsTrigger value="gender">Gender</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>
        <TabsContent value="age">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={detailed ? 60 : 50}
                  outerRadius={detailed ? 80 : 70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="gender">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={detailed ? 60 : 50}
                  outerRadius={detailed ? 80 : 70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}\`} fill={COLORS[index % COLORS.length  index) => (
                    <Cell key={\`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="location">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={detailed ? 60 : 50}
                  outerRadius={detailed ? 80 : 70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="interests">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interestData}
                  cx="50%"
                  cy="50%"
                  innerRadius={detailed ? 60 : 50}
                  outerRadius={detailed ? 80 : 70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {interestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      {detailed && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Top Demographics</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Age: 25-34</span>
                <span className="text-sm font-medium">35%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Gender: Female</span>
                <span className="text-sm font-medium">52%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location: United States</span>
                <span className="text-sm font-medium">60%</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Top Interests</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fitness</span>
                <span className="text-sm font-medium">30%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Technology</span>
                <span className="text-sm font-medium">25%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sm text-muted-foreground">Travel</span>
                <span className="text-sm font-medium">20%</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
