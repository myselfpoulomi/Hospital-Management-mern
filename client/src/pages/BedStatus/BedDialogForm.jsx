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

  // Fetch patients
  useEffect(() => {
    axios
      .get("http://localhost:4000/patients/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients:", err));
  }, []);

  // Load or reset form
  useEffect(() => {
    if (editBed) {
      setFormBed({
        roomNumber: editBed.roomNumber || "",
        bedType: editBed.bedType || "",
        status: editBed.status || "Available",
        patient: typeof editBed.patient === "object" ? editBed.patient._id : editBed.patient || "",
        admissionDate: editBed.admissionDate
          ? new Date(editBed.admissionDate).toISOString().split("T")[0]
          : "",
      });
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
      let response;
      if (isEdit) {
        response = await axios.put(
          `http://localhost:4000/beds/updateBed/${editBed._id}`,
          payload
        );
        onUpdateBed(response.data);
      } else {
        response = await axios.post(
          "http://localhost:4000/beds/createBed",
          payload
        );
        onAddBed(response.data);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please check the data or try again.");
    }
  };

  const getPatientName = (id) => {
    const patient = patients.find((p) => p._id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Select Patient";
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
                    <SelectValue placeholder="Select Patient">
                      {getPatientName(formBed.patient)}
                    </SelectValue>
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
