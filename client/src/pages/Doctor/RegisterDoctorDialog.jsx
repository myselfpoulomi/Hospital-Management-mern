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

const RegisterDoctorDialog = ({ open, onOpenChange, onSuccess, doctorToEdit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [numOfPatients, setNumOfPatients] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (doctorToEdit) {
      setName(doctorToEdit.full_name);
      setDoctorId(doctorToEdit.doctor_id);
      setDegree(doctorToEdit.degree);
      setSpecialization(doctorToEdit.specialization);
      setNumOfPatients(doctorToEdit.patient_count.toString());
    }
  }, [doctorToEdit]);

  const validate = () => {
    let newErrors = {};
    if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!doctorId.trim()) newErrors.doctorId = "Doctor ID is required";
    if (!degree.trim()) newErrors.degree = "Degree is required";
    if (!specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!numOfPatients.trim() || isNaN(numOfPatients) || Number(numOfPatients) <= 0)
      newErrors.numOfPatients = "Enter a valid number of patients";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (doctorToEdit) {
        // Update existing doctor
        const response = await axios.put(`http://localhost:4000/Doctors/updateDoctor/${doctorToEdit._id}`, {
          doctor_id: doctorId,
          full_name: name,
          degree,
          specialization,
          patient_count: Number(numOfPatients),
        });
        console.log("Doctor updated successfully:", response.data);
      } else {
        // Add new doctor
        const response = await axios.post("http://localhost:4000/Doctors/addDoctor", {
          doctor_id: doctorId,
          full_name: name,
          degree,
          specialization,
          patient_count: Number(numOfPatients),
        });
        console.log("Doctor registered successfully:", response.data);
      }

      onSuccess();
      setName("");
      setDoctorId("");
      setDegree("");
      setSpecialization("");
      setNumOfPatients("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting doctor:", error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{doctorToEdit ? "Update Doctor" : "Register New Doctor"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. John Smith"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1">Doctor ID</label>
            <Input
              name="doctorId"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="DOC-001"
            />
            {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
          </div>

          <div>
            <label className="block mb-1">Degree</label>
            <Input
              name="degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="MD, PhD"
            />
            {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
          </div>

          <div>
            <label className="block mb-1">Specialization</label>
            <Input
              name="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Cardiology, Neurology, etc."
            />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
          </div>

          <div>
            <label className="block mb-1">Number of Patients</label>
            <Input
              name="numOfPatients"
              value={numOfPatients}
              type="number"
              min="1"
              onChange={(e) => setNumOfPatients(e.target.value)}
              placeholder="Enter Number of Patients"
            />
            {errors.numOfPatients && (
              <p className="text-red-500 text-sm">{errors.numOfPatients}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (doctorToEdit ? "Updating..." : "Registering...") : (doctorToEdit ? "Update Doctor" : "Register Doctor")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDoctorDialog;
