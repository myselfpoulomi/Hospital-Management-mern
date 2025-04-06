import React, { useState } from "react";
import { PrescriptionDialog } from "./PrescriptionDialog ";
import { PrescriptionTable } from "./PrescriptionTable ";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockPrescriptions = [
  { id: "PRE-2023-001", patientName: "John Smith", doctor: "Dr. Emily Johnson", date: "2023-06-15" },
  { id: "PRE-2023-002", patientName: "Sarah Johnson", doctor: "Dr. Michael Chen", date: "2023-06-15" },
  { id: "PRE-2023-003", patientName: "Robert Williams", doctor: "Dr. Sarah Williams", date: "2023-06-14" },
  { id: "PRE-2023-004", patientName: "Maria Garcia", doctor: "Dr. Emily Johnson", date: "2023-06-14" },
  { id: "PRE-2023-005", patientName: "James Brown", doctor: "Dr. Robert Garcia", date: "2023-06-13" },
  { id: "PRE-2023-006", patientName: "Elizabeth Davis", doctor: "Dr. Michael Chen", date: "2023-06-13" },
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddPrescription = (formData) => {
    console.log("New prescription data:", formData);

    const doctorMap = {
      "1": "Dr. Emily Johnson",
      "2": "Dr. Michael Chen",
      "3": "Dr. Sarah Williams",
      "4": "Dr. Robert Garcia",
    };

    const newPrescription = {
      id: `PRE-2023-${(prescriptions.length + 1).toString().padStart(3, "0")}`,
      patientName: formData.patientName,
      doctor: doctorMap[formData.doctorId] || "Unknown Doctor",
      date: new Date().toISOString().split("T")[0],
    };

    setPrescriptions([newPrescription, ...prescriptions]);
  };

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* <div className="flex justify-between items-center gap-4"> */}
        {/* <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search prescriptions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}
        {/* <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button> */}
      {/* </div> */}
      

      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Prescriptions</h2>
        <PrescriptionTable prescriptions={filteredPrescriptions} />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
