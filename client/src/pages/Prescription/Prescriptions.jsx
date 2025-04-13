import React, { useState, useEffect } from "react";
import { PrescriptionDialog } from "./PrescriptionDialog ";
import { PrescriptionTable } from "./PrescriptionTable ";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
    fetchDoctors();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/prescription/");
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Failed to fetch prescriptions", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
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
      const res = await axios.delete(
        `http://localhost:4000/Prescription/deletePresciption/${id}`
      );

      if (res.status === 200 || res.status === 204) {
        setPrescriptions((prev) => prev.filter((p) => p._id !== id));
      } else {
        console.error("Delete failed with status:", res.status);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedPrescription) {
        // Update prescription
        await axios.put(
          `http://localhost:4000/Prescription/updatePresciption/${selectedPrescription._id}`,
          formData
        );

        const updatedDoctor = doctors.find(
          (doc) => doc._id === formData.assignedDoctor
        );

        const updated = {
          ...selectedPrescription,
          ...formData,
          assignedDoctor: updatedDoctor || selectedPrescription.assignedDoctor,
        };

        setPrescriptions((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
      } else {
        // Add new prescription
        const res = await axios.post(
          "http://localhost:4000/prescription/addPrescription",
          formData
        );
        setPrescriptions((prev) => [...prev, res.data]);
      }

      setDialogOpen(false);
      setSearchQuery("");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // Filter prescriptions based on search query
  const filteredPrescriptions = prescriptions.filter((p) =>
    [
      p.patientName?.full_name,
      p._id,
      p.assignedDoctor?.full_name,
    ].some((val) =>
      (val || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
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
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleAdd}>
            + New Prescription
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Prescriptions</h2>
          <PrescriptionTable
            prescriptions={filteredPrescriptions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(prescription) => console.log("View:", prescription)}
          />
        </div>

        <PrescriptionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedPrescription}
        />
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;
