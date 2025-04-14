import { useState } from "react";
import { Copy, Eye, FileEdit, Search, Trash2, UserPlus, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
// import { useToast } from "@/components/ui/use-toast";

const initialStaffData = [
  { id: 1, name: "John Smith", gender: "Male", contact: "+12345678901", staffType: "Doctor" },
  { id: 2, name: "Sarah Johnson", gender: "Female", contact: "9876543210", staffType: "Nurse" },
  { id: 3, name: "Mike Williams", gender: "Male", contact: "+12345678902", staffType: "Admin" },
  { id: 4, name: "Emily Davis", gender: "Female", contact: "+12345678903", staffType: "Doctor" },
  { id: 5, name: "Alex Turner", gender: "Other", contact: "9876543211", staffType: "Technician" },
  { id: 6, name: "Jessica Parker", gender: "Female", contact: "+12345678904", staffType: "Nurse" },
  { id: 7, name: "David Miller", gender: "Male", contact: "9876543212", staffType: "Admin" },
];

const Staff = () => {
  const [staffData, setStaffData] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState("");
  // const { toast } = useToast();

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (staff) => {
    const staffInfo = `Name: ${staff.name}, Gender: ${staff.gender}, Contact: ${staff.contact}, Staff Type: ${staff.staffType}`;
    navigator.clipboard.writeText(staffInfo);
    // toast({ title: "Copied", description: "Staff info copied to clipboard" });
  };

  const handleDelete = (id) => {
    const updated = staffData.filter(staff => staff.id !== id);
    setStaffData(updated);
    // toast({ title: "Deleted", description: "Staff removed" });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Staff</h1>
            <p className="text-gray-600">Manage staff records and information</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>

        {/* Search bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search staff by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          <Button variant="outline" className="ml-4">
            All Staff
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3">SI No</TableHead>
                <TableHead className="px-6 py-3">Name</TableHead>
                <TableHead className="px-6 py-3">Gender</TableHead>
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
                  <TableCell className="px-6 py-3">{staff.contact}</TableCell>
                  <TableCell className="px-6 py-3">
                    <Badge
                      variant="outline"
                      className={`
                        ${staff.staffType === 'Doctor' && 'bg-blue-50 text-blue-700 border-blue-200'}
                        ${staff.staffType === 'Nurse' && 'bg-green-50 text-green-700 border-green-200'}
                        ${staff.staffType === 'Admin' && 'bg-purple-50 text-purple-700 border-purple-200'}
                        ${staff.staffType === 'Technician' && 'bg-orange-50 text-orange-700 border-orange-200'}
                      `}
                    >
                      {staff.staffType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(staff)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
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
    </DashboardLayout>
  );
};

export default Staff;
