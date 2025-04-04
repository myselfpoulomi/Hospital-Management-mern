import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterDoctorDialog = ({ open, onOpenChange, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Separate state for each input
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
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
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Future API can use this structure
      const doctorData = { name, doctorId, degree, specialization };
      console.log("Submitting doctor data:", doctorData);

      onSuccess();

      // Reset inputs
      setName("");
      setDoctorId("");
      setDegree("");
      setSpecialization("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error registering doctor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register New Doctor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <Input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log("Name:", e.target.value);
              }}
              placeholder="Dr. John Smith"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1">Doctor ID</label>
            <Input
              name="doctorId"
              value={doctorId}
              onChange={(e) => {
                setDoctorId(e.target.value);
                console.log("Doctor ID:", e.target.value);
              }}
              placeholder="DOC-001"
            />
            {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
          </div>

          <div>
            <label className="block mb-1">Degree</label>
            <Input
              name="degree"
              value={degree}
              onChange={(e) => {
                setDegree(e.target.value);
                console.log("Degree:", e.target.value);
              }}
              placeholder="MD, PhD"
            />
            {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
          </div>

          <div>
            <label className="block mb-1">Specialization</label>
            <Input
              name="specialization"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
                console.log("Specialization:", e.target.value);
              }}
              placeholder="Cardiology, Neurology, etc."
            />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDoctorDialog;
