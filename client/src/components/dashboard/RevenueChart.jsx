import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dailyData = [
  { name: "12 AM", revenue: 4000 },
  { name: "4 AM", revenue: 3000 },
  { name: "8 AM", revenue: 5000 },
  { name: "12 PM", revenue: 8000 },
  { name: "4 PM", revenue: 7000 },
  { name: "8 PM", revenue: 6000 },
];

const weeklyData = [
  { name: "Mon", revenue: 24000 },
  { name: "Tue", revenue: 21000 },
  { name: "Wed", revenue: 30000 },
  { name: "Thu", revenue: 28000 },
  { name: "Fri", revenue: 32000 },
  { name: "Sat", revenue: 18000 },
  { name: "Sun", revenue: 15000 },
];

const monthlyData = [
  { name: "Jan", revenue: 120000 },
  { name: "Feb", revenue: 140000 },
  { name: "Mar", revenue: 160000 },
  { name: "Apr", revenue: 180000 },
  { name: "May", revenue: 170000 },
  { name: "Jun", revenue: 190000 },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const RevenueChart = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <div className="text-2xl font-bold text-medical-gray-800">
              $168,420.00
            </div>
          </div>

          {["daily", "weekly", "monthly"].map((timeframe, index) => (
            <TabsContent key={index} value={timeframe} className="mt-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={timeframe === "daily" ? dailyData : timeframe === "weekly" ? weeklyData : monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeframe === "monthly" ? `$${value / 1000}k` : `$${value}`
                    }
                  />
                  <Tooltip formatter={(value) => [formatCurrency(value), "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#1A73E8" fill="#E6F2FF" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
