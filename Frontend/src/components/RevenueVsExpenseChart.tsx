"use client"

import { TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface ChartData {
  month: string
  revenue: number
  expense: number
}


const chartConfig = {
  revenue: { label: "Revenue", color: "#34D399" },
  expense: { label: "Expense", color: "#F87171" },
} satisfies ChartConfig

export default function RevenueVsExpenseChart() {
  const [period, setPeriod] = useState<"Monthly" | "Weekly" | "Yearly">("Monthly")
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  setLoading(true)
  setError(null)
  fetch("http://localhost:4000/api/v1/transaction/aggregate?period=" + period)
    .then(res => res.json())
    .then(res => {
      let sortedData = res.data || [];
      if (period === "Monthly") {
        // Sort and format month as "Jan 2024"
        sortedData = sortedData
          .sort((a: ChartData, b: ChartData) => {
            const [aYear, aMonth] = a.month.split("-").map(Number);
            const [bYear, bMonth] = b.month.split("-").map(Number);
            return aYear !== bYear ? aYear - bYear : aMonth - bMonth;
          })
          .map((item: ChartData) => {
            const [year, month] = item.month.split("-");
            const date = new Date(Number(year), Number(month) - 1);
            return {
              ...item,
              month: date.toLocaleString("default", { month: "short", year: "numeric" })
            };
          });
      }
      setData(sortedData)
      setLoading(false)
    })
    .catch(() => {
      setError("Failed to load chart data.")
      setLoading(false)
    })
}, [period])

  return (
    <Card className="bg-[#2A2B31] text-white w-full h-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revenue vs Expense</CardTitle>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value as "Monthly" | "Weekly" | "Yearly")}
            className="ml-auto bg-[#23242a] border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <CardDescription className="text-gray-400">
          Overview of financials
        </CardDescription>
      </CardHeader>
      <CardContent className="h-50">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid vertical={false} stroke="#374151" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#D1D5DB" }} />
              <YAxis tick={{ fill: "#D1D5DB" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="revenue" type="monotone" stroke="#34D399" strokeWidth={2} dot={false} />
              <Line dataKey="expense" type="monotone" stroke="#F87171" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        {loading && <div className="text-center text-gray-400 mt-2">Loading...</div>}
        {error && <div className="text-center text-red-400 mt-2">{error}</div>}
        {!loading && !error && data.length === 0 && (
          <div className="text-center text-gray-400 mt-2">No data available.</div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-gray-400">
          Trending up <TrendingUp className="w-4 h-4 ml-1 text-green-400" />
        </div>
      </CardFooter>
    </Card>
  )
}