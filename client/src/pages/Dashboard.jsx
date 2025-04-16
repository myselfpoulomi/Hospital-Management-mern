import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Calendar, DollarSign, Users, Pill, Syringe, Stethoscope } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [prevRevenue, setPrevRevenue] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [prevDoctorsCount, setPrevDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [prevPatientsCount, setPrevPatientsCount] = useState(0);
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [prevMedicinesCount, setPrevMedicinesCount] = useState(0);

  const getChange = (current, previous) => {
    if (previous === 0) return { value: "N/A", type: "increase" };
    const change = ((current - previous) / previous) * 100;
    return {
      value: `${Math.abs(change.toFixed(1))}%`,
      type: change >= 0 ? "increase" : "decrease",
    };
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      const all = response.data;

      const sorted = all.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPrescriptions(sorted);
      setFilteredPrescriptions(sorted);

      // This month vs last month revenue
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);

      let currentTotal = 0;
      let prevTotal = 0;

      all.forEach((p) => {
        const createdAt = new Date(p.createdAt);
        if (createdAt.getMonth() === now.getMonth()) {
          currentTotal += p.price;
        } else if (createdAt.getMonth() === lastMonth.getMonth()) {
          prevTotal += p.price;
        }
      });

      setTotalRevenue(currentTotal);
      setPrevRevenue(prevTotal);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Doctors");
      setDoctorsCount(res.data.length);

      const lastMonthCount = res.data.filter((doc) => {
        const created = new Date(doc.createdAt);
        return created.getMonth() === new Date().getMonth() - 1;
      }).length;

      setPrevDoctorsCount(lastMonthCount);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Patients");
      setPatientsCount(res.data.length);

      const lastMonthCount = res.data.filter((p) => {
        const created = new Date(p.createdAt);
        return created.getMonth() === new Date().getMonth() - 1;
      }).length;

      setPrevPatientsCount(lastMonthCount);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Medicine");
      setMedicinesCount(res.data.length);

      const lastMonthCount = res.data.filter((m) => {
        const created = new Date(m.createdAt);
        return created.getMonth() === new Date().getMonth() - 1;
      }).length;

      setPrevMedicinesCount(lastMonthCount);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchDoctors();
    fetchPatients();
    fetchMedicines();
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
            value={doctorsCount}
            icon={<Stethoscope size={20} className="text-blue-500" />}
            change={{
              ...getChange(doctorsCount, prevDoctorsCount),
              period: "from last month",
            }}
          />
          <StatCard
            title="Patients"
            value={patientsCount}
            icon={<Users size={20} className="text-green-500" />}
            change={{
              ...getChange(patientsCount, prevPatientsCount),
              period: "from last month",
            }}
          />
          <StatCard
            title="Medicines"
            value={`${medicinesCount} In Stock`}
            icon={<Pill size={20} className="text-purple-500" />}
            change={{
              ...getChange(medicinesCount, prevMedicinesCount),
              period: "from last month",
            }}
          />
          <StatCard
            title="Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            icon={<DollarSign size={20} className="text-emerald-500" />}
            change={{
              ...getChange(totalRevenue, prevRevenue),
              period: "this month",
            }}
          />
        </div>

        {/* Revenue Chart */}
        <div className="mb-6">
          <RevenueChart
            prescriptions={filteredPrescriptions}
            totalRevenue={totalRevenue}
          />
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
                    {typeof item.patientName === "object"
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
