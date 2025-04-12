import React, { useEffect, useState } from "react";
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
import { Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RevenueChart from "@/components/dashboard/RevenueChart";
import axios from "axios";

const Financial = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const getPrescriptionPrice = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      const prescriptionData = response.data;
      setPrescriptions(prescriptionData);

      // Calculate total revenue
      const total = prescriptionData.reduce((sum, p) => sum + p.price, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  useEffect(() => {
    getPrescriptionPrice();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-medical-gray-900 text-blue-700">
          Financial Overview
        </h1>
        <p className="text-medical-gray-600">
          Monitor revenue, expenses, and financial performance
        </p>
      </div>

      <div className="mb-6">
        <RevenueChart prescriptions={prescriptions} totalRevenue={totalRevenue} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <Filter size={14} className="mr-2 text-medical-gray-500" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  <span>Last 15 Days</span>
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
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>{item.patientName}</TableCell>
                      <TableCell>Prescription</TableCell>
                      <TableCell className="font-medium">
                        ₹{item.price}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
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
