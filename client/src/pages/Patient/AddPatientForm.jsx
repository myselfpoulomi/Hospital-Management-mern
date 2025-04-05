import { useState, useEffect } from "react";
import axios from "axios";
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
import { Textarea } from "@/components/ui/textarea";

const AddPatientForm = ({ onSubmit, initialData = null }) => {
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

  // 🔄 Fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName", "lastName", "gender", "dateOfBirth",
      "contactNumber", "email", "address", "bloodType",
    ];

    for (const key of requiredFields) {
      if (!formData[key]) {
        alert(`${key} is required`);
        return;
      }
    }

    try {
      if (initialData?._id) {
        // 🔁 Update
        await axios.put(
          `http://localhost:4000/Patients/updatePatient/${initialData._id}`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // ➕ Add
        await axios.post(
          "http://localhost:4000/Patients/addPatient",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      onSubmit?.(); // trigger parent update
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Gender</Label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "gender")}
            value={formData.gender}
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
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Blood Type</Label>
          <Select
            onValueChange={(value) => handleSelectChange(value, "bloodType")}
            value={formData.bloodType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="allergies">Allergies</Label>
          <Input id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea id="medicalHistory" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={3} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Update Patient" : "Save Patient"}
        </Button>
      </div>
    </form>
  );
};

export default AddPatientForm;
