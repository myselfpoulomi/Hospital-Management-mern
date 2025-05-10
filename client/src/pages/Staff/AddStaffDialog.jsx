import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const AddStaffDialog = ({ onAdd, onUpdate, staffToEdit = null, mode = "add", open, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    contact: "",
    staffType: "",
  });

  useEffect(() => {
    if (staffToEdit) {
      setFormData({
        name: staffToEdit.name || "",
        gender: staffToEdit.gender || "",
        age: staffToEdit.age || "",
        contact: staffToEdit.contact || "",
        staffType: staffToEdit.staffType || "",
      });
    }
  }, [staffToEdit]);

  const handleSubmit = async () => {
    const { name, gender, age, contact, staffType } = formData;

    if (!name || !gender || !age || !contact || !staffType) {
      alert("Please fill out all fields.");
      return;
    }

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
      if (mode === "edit" && staffToEdit?.id) {
        await axios.put(`${BASE_URL}/Staffs/updateStaff/${staffToEdit.id}`, payload);
        onUpdate?.();
      } else {
        const res = await axios.post(`${BASE_URL}/Staffs/addStaff`, payload);
        onAdd?.(res.data);
      }

      setOpen(false);
      setFormData({ name: "", gender: "", age: "", contact: "", staffType: "" });
    } catch (err) {
      console.error("Submission Error:", err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Update Staff" : "Add New Staff"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
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
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Staff Type</Label>
            <Select
              value={formData.staffType}
              onValueChange={(value) => setFormData({ ...formData, staffType: value })}
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
            {mode === "edit" ? "Update" : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffDialog;
