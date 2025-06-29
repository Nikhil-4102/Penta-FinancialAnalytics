"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const data = [
  { month: "Jan", income: 320, expense: 210 },
  { month: "Feb", income: 870, expense: 130 },
  { month: "Mar", income: 120, expense: 250 },
  { month: "Apr", income: 350, expense: 180 },
  { month: "May", income: 410, expense: 90 },
  { month: "Jun", income: 430, expense: 160 },
  { month: "Jul", income: 224, expense: 360 },
  { month: "Aug", income: 300, expense: 700 },
  { month: "Sep", income: 980, expense: 210 },
  { month: "Oct", income: 840, expense: 550 },
  { month: "Nov", income: 300, expense: 400 },
  { month: "Dec", income: 500, expense: 730 },
]

export function ChartLineIncomeExpenses() {
  return (
    <Card className="bg-muted text-white">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>Overview</CardTitle>
          <CardDescription className="text-white/70">Income vs Expenses</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-white border-white/30">
              Monthly <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Monthly</DropdownMenuItem>
            <DropdownMenuItem>Quarterly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#333" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
