import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import RegisterDoctorDialog from "./RegisterDoctorDialog"; // Import the dialog component

const DoctorsList = ({ refresh, search }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [doctorToEdit, setDoctorToEdit] = useState(null); // Store doctor being edited

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredDoctors(doctors);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredDoctors(
        doctors.filter(
          (doctor) =>
            doctor.full_name?.toLowerCase().includes(lowerSearch) ||
            doctor.specialization?.toLowerCase().includes(lowerSearch) ||
            doctor.degree?.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, doctors]);

  const handleView = (id) => {
    console.log("View doctor:", id);
  };

  const handleEdit = (doctor) => {
    setDoctorToEdit(doctor); // Set the doctor to edit
    setDialogOpen(true); // Open the dialog
  };

  const handleDelete = async (id) => {
    // Confirm before deletion
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        // Send the delete request using MongoDB _id
        await axios.delete(`http://localhost:4000/doctors/deleteDoctor/${id}`);
        setDoctors(doctors.filter((d) => d._id !== id)); // Remove the doctor from the state
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading doctors...</p>;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto ml-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDoctors.length ? (
            filteredDoctors.map((doctor, index) => (
              <TableRow key={doctor._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doctor.full_name}</TableCell>
                <TableCell>{doctor.degree}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(doctor._id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(doctor)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doctor._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center text-gray-500 py-6">
                No doctors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Register or Edit Doctor Dialog */}
      <RegisterDoctorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={() => fetchDoctors()} // Refresh the list after successful update
        doctorToEdit={doctorToEdit}
      />
    </div>
  );
};

export default DoctorsList;
