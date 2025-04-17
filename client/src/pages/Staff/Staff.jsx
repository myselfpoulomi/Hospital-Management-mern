import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AddStaffDialog from "./AddStaffDialog";
import StaffDetailsDialog from "./StaffDetailsDialog";

const Staff = ({ setIsAuthenticated }) => {
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [staffToEdit, setStaffToEdit] = useState(null);
  const [staffToView, setStaffToView] = useState(null);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Staffs");
      const formatted = response.data.map((staff) => ({
        id: staff._id,
        name: staff.full_name,
        gender: staff.gender,
        age: staff.age,
        contact: staff.contact_number,
        staffType: staff.staff_type,
        email: staff.email,
        address: staff.address,
      }));
      setStaffData(formatted);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async () => {
    await fetchStaff();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Staffs/DeleteStaff/${id}`);
      console.log("Staff deleted successfully");
      await fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch = staff.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || staff.staffType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Staff Details</h1>
            <p className="text-gray-600">Manage staff records and information</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-[1300px]">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search staff by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="nurse">Nurse</SelectItem>
              <SelectItem value="technician">Technician</SelectItem>
              <SelectItem value="pharmacist">Pharmacist</SelectItem>
              <SelectItem value="radiologist">Radiologist</SelectItem>
              <SelectItem value="lab_technician">Lab Technician</SelectItem>
              <SelectItem value="cleaning_staff">Cleaning Staff</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
              <SelectItem value="it_support">IT Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3">SI No</TableHead>
                <TableHead className="px-6 py-3">Name</TableHead>
                <TableHead className="px-6 py-3">Gender</TableHead>
                <TableHead className="px-6 py-3">Age</TableHead>
                <TableHead className="px-6 py-3">Contact</TableHead>
                <TableHead className="px-6 py-3">Staff Type</TableHead>
                <TableHead className="px-6 py-3 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff, index) => (
                <TableRow key={staff.id}>
                  <TableCell className="px-6 py-3">{index + 1}</TableCell>
                  <TableCell className="px-6 py-3">{staff.name}</TableCell>
                  <TableCell className="px-6 py-3">{staff.gender}</TableCell>
                  <TableCell className="px-6 py-3">{staff.age}</TableCell>
                  <TableCell className="px-6 py-3">{staff.contact}</TableCell>
                  <TableCell className="px-6 py-3">
                    <Badge
                      variant="outline"
                      className={`
                        ${staff.staffType === "nurse" && "bg-green-50 text-green-700 border-green-200"}
                        ${staff.staffType === "technician" && "bg-orange-50 text-orange-700 border-orange-200"}
                        ${staff.staffType === "pharmacist" && "bg-yellow-50 text-yellow-700 border-yellow-200"}
                        ${staff.staffType === "radiologist" && "bg-indigo-50 text-indigo-700 border-indigo-200"}
                        ${staff.staffType === "lab_technician" && "bg-sky-50 text-sky-700 border-sky-200"}
                        ${staff.staffType === "cleaning_staff" && "bg-rose-50 text-rose-700 border-rose-200"}
                        ${staff.staffType === "security" && "bg-neutral-100 text-neutral-800 border-neutral-300"}
                        ${staff.staffType === "receptionist" && "bg-purple-50 text-purple-700 border-purple-200"}
                        ${staff.staffType === "it_support" && "bg-cyan-50 text-cyan-700 border-cyan-200"}
                      `}
                    >
                      {staff.staffType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setStaffToView(staff); setDetailsDialogOpen(true); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setStaffToEdit(staff); setEditDialogOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddStaffDialog mode="add" open={addDialogOpen} setOpen={setAddDialogOpen} onAdd={handleAddStaff} />

      {staffToEdit && (
        <AddStaffDialog mode="edit" open={editDialogOpen} setOpen={setEditDialogOpen} staffToEdit={staffToEdit} onUpdate={fetchStaff} />
      )}

      {staffToView && (
        <StaffDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} staff={staffToView} />
      )}
    </DashboardLayout>
  );
};

export default Staff;