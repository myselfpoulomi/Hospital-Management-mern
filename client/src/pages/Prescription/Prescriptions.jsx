import React, { useState, useEffect } from "react";
import { PrescriptionDialog } from "./PrescriptionDialog ";
import { PrescriptionTable } from "./PrescriptionTable ";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";

const Prescriptions = ({ setIsAuthenticated }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/Prescription`);
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleAdd = () => {
    setSelectedPrescription(null);
    setDialogOpen(true);
  };

  const handleEdit = (prescription) => {
    setSelectedPrescription(prescription);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/Prescription/deletePresciption/${id}`);
      if (res.status === 200 || res.status === 204) {
        setPrescriptions((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePrescriptionUpdated = () => {
    fetchPrescriptions(); // ✅ Immediately refresh list
  };

  const filteredPrescriptions = prescriptions.filter((p) =>
    [p.patientName?.full_name, p._id, p.assignedDoctor?.full_name].some((val) =>
      (val || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
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
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleAdd}>
            + New Prescription
          </Button>
        </div>

        <div>
          <PrescriptionTable
            prescriptions={filteredPrescriptions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <PrescriptionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          initialData={selectedPrescription}
          onPrescriptionUpdated={handlePrescriptionUpdated}
        />
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
