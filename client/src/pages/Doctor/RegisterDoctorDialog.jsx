import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const RegisterDoctorDialog = ({ open, onOpenChange, onSuccess, doctorToEdit }) => {
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [numOfPatients, setNumOfPatients] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (doctorToEdit) {
      setName(doctorToEdit.full_name || "");
      setDoctorId(doctorToEdit.doctor_id || "");
      setDegree(doctorToEdit.degree || "");
      setSpecialization(doctorToEdit.specialization || "");
      setNumOfPatients(String(doctorToEdit.patient_count || ""));
    } else {
      setName("");
      setDoctorId("");
      setDegree("");
      setSpecialization("");
      setNumOfPatients("");
    }
  }, [doctorToEdit]);

  const validate = () => {
    const newErrors = {};
    if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!doctorId.trim()) newErrors.doctorId = "Doctor ID is required";
    if (!degree.trim()) newErrors.degree = "Degree is required";
    if (!specialization.trim()) newErrors.specialization = "Specialization is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const payload = {
      doctor_id: doctorId,
      full_name: name,
      degree,
      specialization,
      patient_count: Number(numOfPatients),
    };

    try {
      if (doctorToEdit?._id) {
        await axios.put(`${BASE_URL}/Doctors/updateDoctor/${doctorToEdit._id}`, payload);
        await axios.put(`${BASE_URL}/Doctors/updateDoctor/${doctorToEdit._id}`, payload);
      } else {
        await axios.post(`${BASE_URL}/doctors/addDoc`, payload);
      }

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error("Error submitting doctor:", err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="register-doctor-desc" className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{doctorToEdit ? "Update Doctor" : "Register New Doctor"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" id="register-doctor-desc">
          <div>
            <label className="block mb-1">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-1">Doctor ID</label>
            <Input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
            {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
          </div>
          <div>
            <label className="block mb-1">Degree</label>
            <Input value={degree} onChange={(e) => setDegree(e.target.value)} />
            {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
          </div>
          <div>
            <label className="block mb-1">Specialization</label>
            <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
          </div>
          {/* <div>
            <label className="block mb-1">Number of Patients</label>
            <Input
              type="number"
              value={numOfPatients}
              onChange={(e) => setNumOfPatients(e.target.value)}
            />
            {errors.numOfPatients && <p className="text-red-500 text-sm">{errors.numOfPatients}</p>}
          </div> */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (doctorToEdit ? "Updating..." : "Registering...") : doctorToEdit ? "Update Doctor" : "Register Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDoctorDialog;
