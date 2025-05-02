import React, { useState } from "react";
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
  Plus,
  Eye,
  Pencil,
  Trash,
  Search,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserPlus } from "lucide-react";
import BedDialogForm from "./BedDialogForm";
import BedDetailsModal from "./BedDetailsModal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialBeds = [
  {
    id: 1,
    roomNumber: "101-A",
    type: "ICU",
    status: "occupied",
    patient: "John Doe",
    admissionDate: "2025-04-30",
  },
  {
    id: 2,
    roomNumber: "101-B",
    type: "ICU",
    status: "available",
    patient: "",
    admissionDate: "",
  },
  {
    id: 3,
    roomNumber: "102-A",
    type: "General",
    status: "occupied",
    patient: "Jane Smith",
    admissionDate: "2025-05-01",
  },
  {
    id: 4,
    roomNumber: "102-B",
    type: "General",
    status: "maintenance",
    patient: "",
    admissionDate: "",
  },
  {
    id: 5,
    roomNumber: "103-A",
    type: "Private",
    status: "available",
    patient: "",
    admissionDate: "",
  },
  {
    id: 6,
    roomNumber: "103-B",
    type: "Private",
    status: "occupied",
    patient: "Robert Johnson",
    admissionDate: "2025-04-28",
  },
  {
    id: 7,
    roomNumber: "104-A",
    type: "Emergency",
    status: "available",
    patient: "",
    admissionDate: "",
  },
  {
    id: 8,
    roomNumber: "104-B",
    type: "Emergency",
    status: "occupied",
    patient: "Emily Davis",
    admissionDate: "2025-05-02",
  },
];

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
  const [beds, setBeds] = useState(initialBeds);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBed, setEditBed] = useState(null);
  const [viewBed, setViewBed] = useState(null);

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      bed.type.toLowerCase().includes(search.toLowerCase()) ||
      bed.patient.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || bed.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              placeholder="Search staff by bed type..."
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
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
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
                <TableRow key={bed.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bed.roomNumber}</TableCell>
                  <TableCell>{bed.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[bed.status]
                      }`}
                    >
                      {statusIcons[bed.status]}
                      {bed.status}
                    </span>
                  </TableCell>
                  <TableCell>{bed.patient || "-"}</TableCell>
                  <TableCell>{bed.admissionDate || "-"}</TableCell>
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
                    <Trash className="inline h-4 w-4 text-gray-600 hover:text-red-600 cursor-pointer" />
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
        onAddBed={(newBed) => {
          const entry = {
            ...newBed,
            id: beds.length + 1,
          };
          setBeds([...beds, entry]);
        }}
        onUpdateBed={(updatedBed) => {
          setBeds((prev) =>
            prev.map((b) => (b.id === updatedBed.id ? updatedBed : b))
          );
        }}
      />
      <BedDetailsModal
  open={!!viewBed}
  onClose={() => setViewBed(null)}
  bed={viewBed}
/>

    </DashboardLayout>
  );
}
