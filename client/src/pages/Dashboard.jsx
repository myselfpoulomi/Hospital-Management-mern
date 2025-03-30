import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import BedStatusWidget from "@/components/dashboard/BedStatusWidget";
import MedicineInventoryWidget from "@/components/dashboard/MedicineInventoryWidget";
import DoctorScheduleWidget from "@/components/dashboard/DoctorScheduleWidget";
import { Calendar, DollarSign, Users, Activity, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-medical-gray-900">
            Dashboard
          </h1>
          <p className="text-medical-gray-600">Welcome back, Dr. Smith</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Total Patients"
            value="2,542"
            icon={<Users size={20} />}
            change={{ value: "12%", type: "increase" }}
          />
          <StatCard
            title="Today's Appointments"
            value="145"
            icon={<Calendar size={20} />}
            change={{ value: "5%", type: "increase" }}
          />
          <StatCard
            title="Total Revenue"
            value="$16,842"
            icon={<DollarSign size={20} />}
            change={{ value: "8%", type: "increase" }}
          />
          <StatCard
            title="New Prescriptions"
            value="64"
            icon={<FileText size={20} />}
            change={{ value: "3%", type: "decrease" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <BedStatusWidget />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MedicineInventoryWidget />
          <DoctorScheduleWidget />
        </div>
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
