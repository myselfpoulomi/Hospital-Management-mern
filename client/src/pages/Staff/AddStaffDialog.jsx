// components/staff/AddStaffDialog.jsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";

const AddStaffDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    gender: "",
    age: "",
    contact: "",
    staffType: "",
  });

  const handleSubmit = () => {
    const entry = { ...newStaff, id: Date.now() };
    onAdd(entry);
    setNewStaff({ name: "", gender: "", age: "", contact: "", staffType: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="">Full Name</Label>
            <Input
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="mt-3"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={newStaff.gender}
              onValueChange={(value) => setNewStaff({ ...newStaff, gender: value })}
            >
              <SelectTrigger  className="mt-3">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Age</Label>
            <Input
              type="number"
              value={newStaff.age}
              onChange={(e) => setNewStaff({ ...newStaff, age: e.target.value })}
               className="mt-3"
            />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input
              value={newStaff.contact}
              onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
               className="mt-3"
            />
          </div>
          <div>
            <Label>Staff Type</Label>
            <Select
              value={newStaff.staffType}
              onValueChange={(value) => setNewStaff({ ...newStaff, staffType: value })}
            >
              <SelectTrigger  className="mt-3">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Nurse">Nurse</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Technician">Technician</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-blue-600" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffDialog;
