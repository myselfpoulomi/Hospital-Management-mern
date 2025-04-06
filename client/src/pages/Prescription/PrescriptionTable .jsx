import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const PrescriptionTable = ({ prescriptions }) => {
  return (
    <div className="rounded-md border p-6">
      <Table>
        <TableHeader>
          <TableRow className="text-sm text-muted-foreground">
            <TableHead className="w-[60px]">Sl No.</TableHead>
            <TableHead className="w-[200px]">Patient Name</TableHead>
            <TableHead className="w-[200px]">Doctor</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.map((prescription, index) => (
            <TableRow key={prescription.id} className="text-sm">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{prescription.patientName}</TableCell>
              <TableCell>{prescription.doctor}</TableCell>
              <TableCell>{prescription.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
