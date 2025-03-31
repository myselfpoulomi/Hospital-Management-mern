import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Plus, FileText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddPatientForm from "./AddPatientForm";
import PatientDetails from "./PatientDetails";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data
const patients = [
  {
    id: "PAT-001",
    name: "John Smith",
    gender: "Male",
    age: 45,
    contactNumber: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Boston, MA",
    bloodType: "A+",
    status: "Active",
  },
  {
    id: "PAT-002",
    name: "Sarah Johnson",
    gender: "Female",
    age: 32,
    contactNumber: "+1 (555) 987-6543",
    email: "sarah.johnson@example.com",
    address: "456 Oak Ave, Chicago, IL",
    bloodType: "O-",
    status: "Active",
  },
  {
    id: "PAT-003",
    name: "Robert Williams",
    gender: "Male",
    age: 58,
    contactNumber: "+1 (555) 456-7890",
    email: "robert.williams@example.com",
    address: "789 Pine Rd, New York, NY",
    bloodType: "B+",
    status: "Inactive",
  },
  {
    id: "PAT-004",
    name: "Maria Garcia",
    gender: "Female",
    age: 27,
    contactNumber: "+1 (555) 234-5678",
    email: "maria.garcia@example.com",
    address: "321 Elm St, Miami, FL",
    bloodType: "AB+",
    status: "Active",
  },
  {
    id: "PAT-005",
    name: "James Brown",
    gender: "Male",
    age: 39,
    contactNumber: "+1 (555) 876-5432",
    email: "james.brown@example.com",
    address: "654 Maple Dr, Seattle, WA",
    bloodType: "A-",
    status: "Active",
  },
  {
    id: "PAT-006",
    name: "Elizabeth Davis",
    gender: "Female",
    age: 51,
    contactNumber: "+1 (555) 345-6789",
    email: "elizabeth.davis@example.com",
    address: "987 Cedar Ln, Denver, CO",
    bloodType: "O+",
    status: "Inactive",
  },
];

const PatientsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    toast({
      title: "Patient deleted",
      description: `Patient ${id} has been deleted successfully.`,
    });
  };

  const handleAddPatient = () => {
    setIsAddPatientOpen(false);
    toast({
      title: "Patient added",
      description: "New patient has been added successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Patients</h1>
            <p className="text-gray-600">
              Manage patient records and information
            </p>
          </div>

          <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <AddPatientForm onSubmit={handleAddPatient} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-9 border border-gray-300"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  All Patient
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Patients</DropdownMenuItem>
                <DropdownMenuItem>Active Patients</DropdownMenuItem>
                <DropdownMenuItem>Inactive Patients</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-50">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Blood Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-3">{patient.id}</td>
                    <td className="px-6 py-3">{patient.name}</td>
                    <td className="px-6 py-3">{patient.gender}</td>
                    <td className="px-6 py-3">{patient.age}</td>
                    <td className="px-6 py-3">{patient.contactNumber}</td>
                    <td className="px-6 py-3">{patient.bloodType}</td>
                    <td className="px-6 py-3">{patient.status}</td>
                    <td className="px-6 py-3 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
            </DialogHeader>
            {selectedPatient && <PatientDetails patient={selectedPatient} />}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PatientsPage;
