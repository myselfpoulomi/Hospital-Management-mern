import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BedDetailsModal({ open, onClose, bed }) {
  if (!bed) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bed Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2 text-sm text-gray-700">
          <div>
            <strong>Room Number:</strong>
            <div>{bed.roomNumber}</div>
          </div>
          <div>
            <strong>Bed Type:</strong>
            <div>{bed.type}</div>
          </div>
          <div>
            <strong>Status:</strong>
            <div>{bed.status}</div>
          </div>
          <div>
            <strong>Patient:</strong>
            <div>{bed.patient || "-"}</div>
          </div>
          <div>
            <strong>Admission Date:</strong>
            <div>{bed.admissionDate || "-"}</div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
