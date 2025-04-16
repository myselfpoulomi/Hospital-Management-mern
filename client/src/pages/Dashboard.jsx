import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Calendar, DollarSign, Users, Pill } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0); // ✅ Add this

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPrescriptions(sorted);
      setFilteredPrescriptions(sorted);

      const total = sorted.reduce((sum, p) => sum + p.price, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <DashboardLayout>
      <>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Doctors"
            value="8"
            icon={<Users size={20} className="text-blue-500" />}
            change={{
              value: "1",
              type: "increase",
              period: "new this month",
            }}
          />
          <StatCard
            title="Patients"
            value="123"
            icon={<Calendar size={20} className="text-green-500" />}
            change={{
              value: "12%",
              type: "increase",
              period: "from last month",
            }}
          />
          <StatCard
            title="Medicines"
            value="55 In Stock"
            icon={<Pill size={20} className="text-purple-500" />}
            change={{
              value: "5",
              type: "warning",
              period: "low stock",
            }}
          />
          <StatCard
            title="Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`} // ✅ Use calculated value
            icon={<DollarSign size={20} className="text-emerald-500" />}
            change={{
              value: "8%",
              type: "increase",
              period: "this month",
            }}
          />
        </div>

        {/* Revenue Chart */}
        <div className="mb-6">
          <RevenueChart />
        </div>

        {/* Recent Prescriptions Table */}
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

      <TableCell>
        {/* Access full name safely */}
        {typeof item.patientName === 'object'
          ? `${item.patientName.firstName} ${item.patientName.lastName}`
          : item.patientName}
      </TableCell>

      <TableCell>Prescription</TableCell>
      <TableCell className="font-medium">₹{item.price}</TableCell>
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
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
