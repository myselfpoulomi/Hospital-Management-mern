import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BedDialogForm({
  isOpen,
  setIsOpen,
  onAddBed,
  editBed,
  onUpdateBed,
}) {
  const isEdit = !!editBed;

  const [formBed, setFormBed] = useState({
    roomNumber: "",
    bedType: "",
    status: "Available",
    patient: "",
    admissionDate: "",
  });

  const [patients, setPatients] = useState([]);

  // Fetch patients from backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/patients/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients:", err));
  }, []);

  // Load existing bed or reset
  useEffect(() => {
    if (editBed) {
      setFormBed(editBed);
    } else {
      setFormBed({
        roomNumber: "",
        bedType: "",
        status: "Available",
        patient: "",
        admissionDate: "",
      });
    }
  }, [editBed, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBed((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { roomNumber, bedType, status, patient, admissionDate } = formBed;

    if (!roomNumber || !bedType || !status) {
      alert("Room number, bed type, and status are required.");
      return;
    }

    if (status === "Occupied" && (!patient || !admissionDate)) {
      alert("Patient and admission date are required for Occupied beds.");
      return;
    }

    const payload = { ...formBed };
    if (status !== "Occupied") {
      delete payload.patient;
      delete payload.admissionDate;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/Beds/createBed",
        payload
      );
      isEdit ? onUpdateBed(response.data) : onAddBed(response.data);
      setIsOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert("Server error: " + error.response.data.error);
      } else {
        console.error("Error:", error.message);
        alert("Failed to submit form.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Bed" : "Add New Bed"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Room Number</Label>
            <Input
              name="roomNumber"
              placeholder="e.g. 105-A"
              value={formBed.roomNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Bed Type</Label>
            <Input
              name="bedType"
              placeholder="e.g. ICU, General"
              value={formBed.bedType}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formBed.status}
              onValueChange={(value) =>
                setFormBed((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formBed.status === "Occupied" && (
            <>
              <div>
                <Label>Patient</Label>
                <Select
                  value={formBed.patient}
                  onValueChange={(value) =>
                    setFormBed((prev) => ({ ...prev, patient: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select Patient"
                      children={
                        patients.find((p) => p._id === formBed.patient)
                          ? `${patients.find((p) => p._id === formBed.patient).firstName} ${patients.find((p) => p._id === formBed.patient).lastName}`
                          : "Select Patient"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Admission Date</Label>
                <Input
                  type="date"
                  name="admissionDate"
                  value={formBed.admissionDate}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEdit ? "Update Bed" : "Save Bed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
