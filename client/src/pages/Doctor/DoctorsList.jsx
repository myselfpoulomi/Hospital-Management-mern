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
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const DoctorsList = ({ refresh, search }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleView = (doctorId) => {
    // Implement logic to view doctor details (e.g., navigate to doctor detail page)
    console.log(`View doctor with ID: ${doctorId}`);
  };

  const handleEdit = (doctorId) => {
    // Implement logic to edit doctor details (e.g., show edit modal)
    console.log(`Edit doctor with ID: ${doctorId}`);
  };

  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:4000/doctors/${doctorId}`);
      setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
      setFilteredDoctors(
        filteredDoctors.filter((doctor) => doctor.id !== doctorId)
      );
      console.log(`Doctor with ID: ${doctorId} deleted`);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  if (loading)
    return <p className="text-gray-500 text-center">Loading doctors...</p>;

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
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor, index) => (
          <TableRow key={doctor.id} className="hover:bg-gray-50 transition">
            <TableCell className="pl-4">{index + 1}</TableCell>
            <TableCell className="pl-4">{doctor.full_name}</TableCell>
            <TableCell className="pl-4">{doctor.degree}</TableCell>
            <TableCell className="pl-4">{doctor.specialization}</TableCell>
            <TableCell className="px-6 py-3">
              <div className="flex justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleView(doctor.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(doctor.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doctor.id)}
                >
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
</div>

  );
};

export default DoctorsList;
