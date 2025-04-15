import { useState } from "react";
import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const handleSubmit = async () => {
    const { name, gender, age, contact, staffType } = newStaff;

    // Check for empty fields
    if (!name || !gender || !age || !contact || !staffType) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate contact number
    const isValidContact = /^[0-9]{10}$/.test(contact.trim());
    if (!isValidContact) {
      alert("Enter a valid 10-digit contact number.");
      return;
    }

    const payload = {
      full_name: name.trim(),
      gender: gender.toLowerCase(),
      age: parseInt(age),
      contact_number: contact.trim(),
      staff_type: staffType.toLowerCase(),
    };

    try {
      const res = await axios.post("http://localhost:4000/Staffs/addStaff", payload);

      console.log("Response:", res.data);
      onAdd(res.data);
      setOpen(false);
      setNewStaff({ name: "", gender: "", age: "", contact: "", staffType: "" });
    } catch (err) {
      console.error("Submission Error:", err);
      alert(
        err.response?.data?.message ||
          "Server error. Check backend logs for details."
      );
    }
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
            <Label>Full Name</Label>
            <Input
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={newStaff.gender}
              onValueChange={(value) => setNewStaff({ ...newStaff, gender: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Age</Label>
            <Input
              type="number"
              value={newStaff.age}
              onChange={(e) => setNewStaff({ ...newStaff, age: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input
              value={newStaff.contact}
              onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Staff Type</Label>
            <Select
              value={newStaff.staffType}
              onValueChange={(value) => setNewStaff({ ...newStaff, staffType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Staff Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
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
