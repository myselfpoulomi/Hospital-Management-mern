// DoctorsList.jsx
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
import DoctorDetailsDialog from "./DoctorDeatilsDialog";
import RegisterDoctorDialog from "./RegisterDoctorDialog";

const DoctorsList = ({ refresh, search, onEdit }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);

  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [specializations, setSpecializations] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/doctors/");
      setDoctors(response.data);

      const uniqueSpecs = Array.from(
        new Set(response.data.map((doc) => doc.specialization))
      );
      setSpecializations(uniqueSpecs);
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
    let filtered = [...doctors];

    if (specializationFilter !== "All") {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === specializationFilter
      );
    }

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.full_name?.toLowerCase().includes(lowerSearch) ||
          doctor.specialization?.toLowerCase().includes(lowerSearch) ||
          doctor.degree?.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredDoctors(filtered);
  }, [search, specializationFilter, doctors]);

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setViewDialogOpen(true);
  };

  const handleEdit = (doctor) => {
    setDoctorToEdit(doctor);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/doctors/deleteDoctor/${id}`);
      setDoctors(doctors.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading doctors...</p>;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto ml-4 p-4">
      {/* Specialization Filter */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-gray-700">
          Filter by Specialization:
        </label>
        <select
          className="border rounded px-3 py-1 text-sm"
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        >
          <option value="All">All</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(doctor)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(doctor)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(doctor._id)}
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

      {/* View Dialog */}
      <DoctorDetailsDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        doctor={selectedDoctor}
      />

      {/* Edit Dialog */}
      <RegisterDoctorDialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setDoctorToEdit(null);
        }}
        onSuccess={fetchDoctors}
        doctorToEdit={doctorToEdit}
      />
    </div>
  );
};

export default DoctorsList;
