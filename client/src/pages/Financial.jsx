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
import { Search } from "lucide-react";
import RevenueChart from "@/components/dashboard/RevenueChart";
import axios from "axios";

const Financial = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPrescriptions(sorted);
      setFilteredPrescriptions(sorted); // Set initially to all
      const total = sorted.reduce((sum, p) => sum + p.price, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      // Show all if input is empty
      setFilteredPrescriptions(prescriptions);
      const total = prescriptions.reduce((sum, p) => sum + p.price, 0);
      setTotalRevenue(total);
    } else {
      // Filter by patient name (case-insensitive)
      const filtered = prescriptions.filter((p) =>
        p.patientName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPrescriptions(filtered);
      const total = filtered.reduce((sum, p) => sum + p.price, 0);
      setTotalRevenue(total);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
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
        <RevenueChart prescriptions={filteredPrescriptions} totalRevenue={totalRevenue} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex items-center border rounded-md px-3 py-2 w-[1550px]">
                  <Search size={14} className="mr-2 text-medical-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by Patient Name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full outline-none"
                  />
                </div>
              </div>
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
                  {filteredPrescriptions.map((item) => (
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
                  {filteredPrescriptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No prescriptions found.
                      </TableCell>
                    </TableRow>
                  )}
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
