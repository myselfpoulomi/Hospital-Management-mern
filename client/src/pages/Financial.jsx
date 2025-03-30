import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Clipboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RevenueChart from "@/components/dashboard/RevenueChart";

const transactions = [
  {
    id: "TX-2023-001",
    patient: "John Smith",
    service: "Cardiology Consultation",
    date: "2023-06-15",
    amount: 250.00,
    status: "Paid",
    method: "Credit Card",
  },
  {
    id: "TX-2023-002",
    patient: "Sarah Johnson",
    service: "Laboratory Tests",
    date: "2023-06-15",
    amount: 180.50,
    status: "Paid",
    method: "Cash",
  },
  {
    id: "TX-2023-003",
    patient: "Robert Williams",
    service: "X-Ray Imaging",
    date: "2023-06-15",
    amount: 320.00,
    status: "Pending",
    method: "Insurance",
  },
  {
    id: "TX-2023-004",
    patient: "Maria Garcia",
    service: "Physical Therapy Session",
    date: "2023-06-14",
    amount: 150.00,
    status: "Paid",
    method: "Debit Card",
  },
  {
    id: "TX-2023-005",
    patient: "James Brown",
    service: "Emergency Room Visit",
    date: "2023-06-14",
    amount: 950.00,
    status: "Pending",
    method: "Insurance",
  },
  {
    id: "TX-2023-006",
    patient: "Elizabeth Davis",
    service: "Neurology Consultation",
    date: "2023-06-14",
    amount: 300.00,
    status: "Paid",
    method: "Credit Card",
  },
];

const Financial = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-medical-gray-900">Financial Overview</h1>
        <p className="text-medical-gray-600">
          Monitor revenue, expenses, and financial performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <FinancialStatCard
          title="Today's Revenue"
          value="$4,238"
          trend="up"
          percent="8.2"
          icon={<DollarSign size={20} />}
          description="Today's earnings"
        />
        <FinancialStatCard
          title="Weekly Revenue"
          value="$28,650"
          trend="up"
          percent="5.4"
          icon={<TrendingUp size={20} />}
          description="vs. last week"
        />
        <FinancialStatCard
          title="Average Bill"
          value="$275"
          trend="down"
          percent="2.1"
          icon={<Clipboard size={20} />}
          description="per patient"
        />
        <FinancialStatCard
          title="Patients Billed"
          value="145"
          trend="up"
          percent="12.3"
          icon={<Users size={20} />}
          description="today"
        />
      </div>

      <div className="mb-6">
        <RevenueChart />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <span className="flex items-center">
                      <Filter size={14} className="mr-2 text-medical-gray-500" />
                      <SelectValue placeholder="Status" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  <span>Jun 1 - Jun 15</span>
                </Button>
              </div>
              <Button variant="outline">
                <Download size={14} className="mr-2" />
                Export
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.patient}</TableCell>
                      <TableCell>{transaction.service}</TableCell>
                      <TableCell className="font-medium">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Financial;
