import { useEffect, useState } from "react";
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

const AddPatientForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    address: "",
    bloodType: "",
    allergies: "",
    medicalHistory: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        gender: formatGender(initialData.gender),
        dateOfBirth: formatDate(initialData.dateOfBirth),
        contactNumber: initialData.contactNumber || "",
        email: initialData.email || "",
        address: initialData.address || "",
        bloodType: formatBloodType(initialData.bloodType),
        allergies: initialData.allergies || "",
        medicalHistory: initialData.medicalHistory || "",
      });
    }
  }, [initialData]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // "yyyy-mm-dd"
  };

  const formatGender = (gender) => {
    if (!gender) return "";
    const g = gender.toLowerCase();
    if (g === "male" || g === "female" || g === "other") {
      return g.charAt(0).toUpperCase() + g.slice(1);
    }
    return "";
  };

  const formatBloodType = (bt) => {
    if (!bt) return "";
    return bt.toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "contactNumber",
      "email",
      "address",
      "bloodType",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required`);
        return;
      }
    }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange(value, "gender")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Contact Number</Label>
          <Input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <Label>Address</Label>
          <Input name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <Label>Blood Type</Label>
          <Select
            value={formData.bloodType}
            onValueChange={(value) => handleSelectChange(value, "bloodType")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Allergies</Label>
          <Input name="allergies" value={formData.allergies} onChange={handleChange} />
        </div>
        <div className="sm:col-span-2">
          <Label>Medical History</Label>
          <Input name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Update Patient" : "Save Patient"}
        </Button>
      </div>
    </form>
  );
};

export default AddPatientForm;
