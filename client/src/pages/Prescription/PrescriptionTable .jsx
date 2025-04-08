import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";

export const PrescriptionTable = ({ prescriptions, onView, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border p-6">
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
          {prescriptions.map((prescription, index) => (
            <TableRow key={prescription._id} className="text-sm">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{prescription.patientName}</TableCell>
              <TableCell>{prescription.assignedDoctor?.full_name || "N/A"}</TableCell>
              <TableCell>{new Date(prescription.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-6">
                  <Eye
                    className="h-4 w-4 text-blue-600 cursor-pointer hover:scale-110"
                    onClick={() => onView(prescription)}
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
