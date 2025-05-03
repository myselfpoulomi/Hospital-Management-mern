import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  BedIcon,
  Check,
  Eye,
  Pencil,
  Trash,
  Search,
  UserPlus,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BedDialogForm from "./BedDialogForm";
import BedDetailsModal from "./BedDetailsModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusStyles = {
  available: "bg-green-100 text-green-700",
  occupied: "bg-blue-100 text-blue-700",
  maintenance: "bg-yellow-100 text-yellow-700",
};

const statusIcons = {
  available: <Check className="h-3.5 w-3.5 mr-1 text-green-600" />,
  occupied: <BedIcon className="h-3.5 w-3.5 mr-1 text-blue-600" />,
  maintenance: <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-600" />,
};

export default function BedStatus({ setIsAuthenticated }) {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBed, setEditBed] = useState(null);
  const [viewBed, setViewBed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bedsRes, patientsRes] = await Promise.all([
          axios.get("http://localhost:4000/beds"),
          axios.get("http://localhost:4000/patients"),
        ]);
        setBeds(bedsRes.data);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getPatientName = (patientField) => {
    if (!patientField) return "-";
    if (typeof patientField === "object" && patientField.firstName) {
      return `${patientField.firstName} ${patientField.lastName}`;
    }
    const found = patients.find((p) => p._id === patientField);
    return found ? `${found.firstName} ${found.lastName}` : "-";
  };

  const filteredBeds = useMemo(() => {
    const searchLower = search.toLowerCase();

    return beds.filter((bed) => {
      const room = bed.roomNumber?.toString().toLowerCase() || "";
      const type = bed.bedType?.toLowerCase() || "";
      const patientName = getPatientName(bed.patient)?.toLowerCase() || "";
      const bedStatus = bed.status?.toLowerCase() || "";

      const matchesSearch =
        search === "" ||
        room.includes(searchLower) ||
        type.includes(searchLower) ||
        patientName.includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || bedStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [beds, patients, search, statusFilter]);

  const handleAddBed = (newBed) => {
    setBeds((prev) => [...prev, newBed]);
  };

  const handleUpdateBed = (updatedBed) => {
    setBeds((prev) =>
      prev.map((bed) => (bed._id === updatedBed._id ? updatedBed : bed))
    );
  };

  const handleDeleteBed = async (bedId) => {
   
    try {
      await axios.delete(`http://localhost:4000/beds/deleteBed/${bedId}`);
      setBeds((prev) => prev.filter((bed) => bed._id !== bedId));
    } catch (error) {
      console.error("Failed to delete bed:", error);
      alert("Failed to delete bed. Please try again.");
    }
  };

  return (
    <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Bed Status</h1>
            <p className="text-gray-600">Manage Bed records and information</p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditBed(null);
              setDialogOpen(true);
            }}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Bed
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-[1300px]">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by room number, bed type, or patient name..."
              className="pl-8 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl No</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Bed Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeds.map((bed, index) => (
                <TableRow key={bed._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bed.roomNumber}</TableCell>
                  <TableCell>{bed.bedType}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[bed.status?.toLowerCase()] || ""
                      }`}
                    >
                      {statusIcons[bed.status?.toLowerCase()] || null}
                      {bed.status}
                    </span>
                  </TableCell>
                  <TableCell>{getPatientName(bed.patient)}</TableCell>
                  <TableCell>
                    {bed.admissionDate
                      ? new Date(bed.admissionDate).toLocaleDateString("en-CA")
                      : "-"}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Eye
                      className="inline h-4 w-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => setViewBed(bed)}
                    />
                    <Pencil
                      className="inline h-4 w-4 text-gray-600 hover:text-yellow-600 cursor-pointer"
                      onClick={() => {
                        setEditBed(bed);
                        setDialogOpen(true);
                      }}
                    />
                    <Trash
                      className="inline h-4 w-4 text-gray-600 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDeleteBed(bed._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredBeds.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No matching beds found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Showing {filteredBeds.length} of {beds.length} beds
        </div>
      </div>

      <BedDialogForm
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        editBed={editBed}
        onAddBed={handleAddBed}
        onUpdateBed={handleUpdateBed}
      />

      <BedDetailsModal
        open={!!viewBed}
        onClose={() => setViewBed(null)}
        bed={viewBed}
      />
    </DashboardLayout>
  );
}
