"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const generateData = () => {
  return [
    { name: "18-24", male: 15, female: 18, other: 2 },
    { name: "25-34", male: 25, female: 28, other: 3 },
    { name: "35-44", male: 20, female: 22, other: 2 },
    { name: "45-54", male: 15, female: 16, other: 1 },
    { name: "55-64", male: 10, female: 12, other: 1 },
    { name: "65+", male: 5, female: 6, other: 0 },
  ]
}

export function AudienceInsightsChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="male" name="Male" fill="#8884d8" />
        <Bar dataKey="female" name="Female" fill="#82ca9d" />
        <Bar dataKey="other" name="Other" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}
