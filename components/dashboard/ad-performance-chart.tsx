"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const generateData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      impressions: Math.floor(Math.random() * 5000) + 3000,
      clicks: Math.floor(Math.random() * 300) + 100,
      conversions: Math.floor(Math.random() * 50) + 10,
    })
  }
  return data
}

export function AdPerformanceChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
        <Tooltip />
        <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="conversions" stroke="#ffc658" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
