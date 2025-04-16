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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Format revenue to INR currency
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const RevenueChart = ({ prescriptions = [], totalRevenue = 0 }) => {
  const calculateRevenueData = (timeframe) => {
    const today = new Date();
    let data = [];

    if (timeframe === "daily") {
      // Group revenue by 4-hour intervals
      data = Array(6)
        .fill(0)
        .map((_, i) => {
          const hour = i * 4;
          const label = new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });
          return { name: label, revenue: 0 };
        });

      prescriptions.forEach((p) => {
        const createdAt = new Date(p.createdAt);
        if (createdAt.toDateString() === today.toDateString()) {
          const hour = createdAt.getHours();
          const index = Math.floor(hour / 4);
          if (data[index]) data[index].revenue += p.price;
        }
      });
    }

    if (timeframe === "weekly") {
      // Group revenue by days of the week
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      data = weekDays.map((day) => ({ name: day, revenue: 0 }));

      prescriptions.forEach((p) => {
        const createdAt = new Date(p.createdAt);
        const dayIndex = createdAt.getDay();
        data[dayIndex].revenue += p.price;
      });
    }

    if (timeframe === "monthly") {
      // Group revenue by months
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      data = months.map((month) => ({ name: month, revenue: 0 }));

      prescriptions.forEach((p) => {
        const createdAt = new Date(p.createdAt);
        const monthIndex = createdAt.getMonth();
        data[monthIndex].revenue += p.price;
      });
    }

    return data;
  };

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
              {formatCurrency(totalRevenue)}
            </div>
          </div>

          {["daily", "weekly", "monthly"].map((timeframe) => (
            <TabsContent key={timeframe} value={timeframe} className="mt-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={calculateRevenueData(timeframe)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeframe === "monthly"
                        ? `${formatCurrency(value / 1000)}k`
                        : formatCurrency(value)
                    }
                  />
                  <Tooltip formatter={(value) => [formatCurrency(value), "Revenue"]} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1A73E8"
                    fill="#E6F2FF"
                  />
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
