import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export const PrescriptionDialog = ({
  open,
  onClose,
  onPrescriptionUpdated,
  initialData,
}) => {
  const [form, setForm] = useState({
    patientId: "",
    dob: "",
    address: "",
    price: "",
    assignedDoctor: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/doctors/")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors", err));

    axios.get("http://localhost:4000/Patients/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients", err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        patientId: initialData.patientName?._id || "",
        dob: initialData.dob?.split("T")[0] || "",
        address: initialData.address || "",
        price: initialData.price || "",
        assignedDoctor: initialData.assignedDoctor?._id || "",
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setForm({
      patientId: "",
      dob: "",
      address: "",
      price: "",
      assignedDoctor: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePatientSelect = (value) => {
    const selected = patients.find((p) => p._id === value);
    if (selected) {
      setForm((prevForm) => ({
        ...prevForm,
        patientId: selected._id,
        dob: selected.dateOfBirth?.split("T")[0] || "",
        address: selected.address || "",
      }));
    }
  };

  const handleDoctorSelect = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      assignedDoctor: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patientName: form.patientId,
      dob: form.dob,
      address: form.address,
      price: parseFloat(form.price),
      assignedDoctor: form.assignedDoctor,
    };

    try {
      let res;
      if (initialData) {
        res = await axios.put(
          `http://localhost:4000/Prescription/updatePresciption/${initialData._id}`,
          payload
        );
      } else {
        res = await axios.post(
          "http://localhost:4000/Prescription/addPresciption",
          payload
        );
      }

      console.log("Prescription saved:", res.data);

      // ✅ Trigger refresh from parent
      if (onPrescriptionUpdated) onPrescriptionUpdated();

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting prescription:", error);
      alert("Failed to save prescription.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Prescription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient Name</Label>
              <Select value={form.patientId} onValueChange={handlePatientSelect}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient._id} value={patient._id}>
                      {patient.full_name || `${patient.firstName} ${patient.lastName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">DOB</Label>
              <Input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Address</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Price</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Doctor</Label>
              <Select value={form.assignedDoctor} onValueChange={handleDoctorSelect}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc._id} value={doc._id}>
                      {doc.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
