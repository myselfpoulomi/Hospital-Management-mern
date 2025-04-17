import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PrescriptionTable = ({ prescriptions, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = recent to old, "asc" = old to recent

  const handleView = (id) => {
    navigate(`/prescription/${id}`);
  };

  const sortedPrescriptions = useMemo(() => {
    return [...prescriptions].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [prescriptions, sortOrder]);

  return (
    <div className="rounded-md border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Prescriptions</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by date:</span>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Recent to Old</SelectItem>
              <SelectItem value="asc">Old to Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="text-sm text-muted-foreground">
            <TableHead className="w-[60px]">Sl No.</TableHead>
            <TableHead className="w-[200px]">Patient Name</TableHead>
            <TableHead className="w-[200px]">Doctor</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPrescriptions.map((prescription, index) => (
            <TableRow key={prescription._id} className="text-sm">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{prescription.patientName?.full_name || "N/A"}</TableCell>
              <TableCell>{prescription.assignedDoctor?.full_name || "N/A"}</TableCell>
              <TableCell>{new Date(prescription.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-6">
                  <Eye
                    className="h-4 w-4 text-blue-600 cursor-pointer hover:scale-110"
                    onClick={() => handleView(prescription._id)}
                  />
                  <Pencil
                    className="h-4 w-4 text-green-600 cursor-pointer hover:scale-110"
                    onClick={() => onEdit(prescription)}
                  />
                  <Trash2
                    className="h-4 w-4 text-red-600 cursor-pointer hover:scale-110"
                    onClick={() => onDelete(prescription._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
