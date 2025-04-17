import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const DoctorDetailsDialog = ({ open, onOpenChange, doctor }) => {
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const fetchPatientCount = async () => {
      if (doctor?.doctor_id && open) {
        try {
          const response = await axios.get(
            `http://localhost:4000/doctors/getPatientCount/${doctor._id}`
          );
          console.log(response);
          
          setPatientCount(response.data.count || 0);
        } catch (error) {
          console.error("Failed to fetch patient count:", error);
          setPatientCount(0);
        }
      }
    };

    fetchPatientCount();
  }, [doctor, open]);

  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Doctor Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">Full Name:</p>
              <p>{doctor.full_name || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Doctor ID:</p>
              <p>{doctor.doctor_id || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Degree:</p>
              <p>{doctor.degree || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Specialization:</p>
              <p>{doctor.specialization || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Number of Patients:</p>
              <p>{patientCount}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetailsDialog;
