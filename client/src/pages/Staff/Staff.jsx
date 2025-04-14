import { useState } from "react";
import { Copy, FileEdit, Search, Trash2, UserPlus } from "lucide-react";
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
//   const { toast } = useToast();

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (staff) => {
    const staffInfo = `Name: ${staff.name}, Gender: ${staff.gender}, Contact: ${staff.contact}, Staff Type: ${staff.staffType}`;
    navigator.clipboard.writeText(staffInfo);
    toast({
      title: "Staff Details Copied",
      description: "Staff information has been copied to clipboard.",
    });
  };

  const handleDelete = (id) => {
    const newStaffData = staffData.filter(staff => staff.id !== id);
    setStaffData(newStaffData);
    toast({
      title: "Staff Removed",
      description: "Staff record has been removed successfully.",
    });
  };

  return (
    <DashboardLayout>
    <div className="container mx-auto">
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

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search staff by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="ml-4">
          All Staff
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SI No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Staff Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff, index) => (
              <TableRow key={staff.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.gender}</TableCell>
                <TableCell>{staff.contact}</TableCell>
                <TableCell>
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
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(staff)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
