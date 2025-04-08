import React, { useState, useEffect } from "react";
import { PrescriptionDialog } from "./PrescriptionDialog ";
import { PrescriptionTable } from "./PrescriptionTable ";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch prescriptions from backend
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Failed to fetch prescriptions", error);
    }
  };

  const handleAddPrescription = () => {
    fetchPrescriptions(); // Refetch after adding new one
  };

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      (prescription?.patientName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (prescription?._id?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (prescription?.assignedDoctor?.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <div className="w-[350px]">
            <h1 className="text-2xl font-bold text-blue-600">Prescriptions</h1>
            <p className="text-gray-500">Manage and generate patient prescriptions</p>
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search prescriptions..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <PrescriptionDialog onSubmit={handleAddPrescription} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Prescriptions</h2>
          <PrescriptionTable prescriptions={filteredPrescriptions} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
