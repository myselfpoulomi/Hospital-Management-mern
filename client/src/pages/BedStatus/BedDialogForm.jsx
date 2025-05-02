import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BedDialogForm({
  isOpen,
  setIsOpen,
  onAddBed,
  editBed,
  onUpdateBed,
}) {
  const isEdit = !!editBed;

  const [formBed, setFormBed] = useState({
    roomNumber: "",
    type: "",
    status: "available",
    patient: "",
    admissionDate: "",
  });

  useEffect(() => {
    if (editBed) {
      setFormBed(editBed);
    } else {
      setFormBed({
        roomNumber: "",
        type: "",
        status: "available",
        patient: "",
        admissionDate: "",
      });
    }
  }, [editBed, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBed((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formBed.roomNumber || !formBed.type) return;

    if (isEdit) {
      onUpdateBed(formBed);
    } else {
      onAddBed(formBed);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Bed" : "Add New Bed"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Room Number</Label>
            <Input
              name="roomNumber"
              placeholder="e.g. 105-A"
              value={formBed.roomNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Bed Type</Label>
            <Input
              name="type"
              placeholder="e.g. ICU, General"
              value={formBed.type}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formBed.status}
              onValueChange={(value) =>
                setFormBed((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Patient Name</Label>
            <Input
              name="patient"
              placeholder="Patient Name"
              value={formBed.patient}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Admission Date</Label>
            <Input
              type="date"
              name="admissionDate"
              value={formBed.admissionDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEdit ? "Update Bed" : "Save Bed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
