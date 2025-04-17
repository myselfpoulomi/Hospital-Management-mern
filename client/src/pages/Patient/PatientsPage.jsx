import { useEffect, useState } from "react";
import axios from "axios";
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

const PatientsPage = ({ setIsAuthenticated }) => {
  const { toast } = useToast();
  const [patients, setPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]); // to store the full list
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Patients/");
      setPatients(response.data);
      setAllPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast({
        variant: "destructive",
        title: "Error fetching patients",
        description: "Something went wrong while retrieving patient data.",
      });
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        searchByName(searchQuery.trim());
      } else {
        fetchPatients();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const searchByName = async (name) => {
    const match = allPatients.find(
      (p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(name.toLowerCase())
    );

    if (!match) {
      setPatients([]);
      toast({
        variant: "destructive",
        title: "No match found",
        description: `No patient found with name: ${name}`,
      });
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/patients/${match._id}`);
      setPatients([res.data]);
    } catch (err) {
      console.error("Error fetching patient by ID:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch patient details.",
      });
    }
  };

  const handleAddOrUpdatePatient = async (data) => {
    try {
      if (editingPatient) {
        await axios.put(
          `http://localhost:4000/Patients/updatePatient/${editingPatient._id}`,
          data
        );
        toast({
          title: "Patient updated",
          description: "Patient updated successfully.",
        });
      } else {
        await axios.post("http://localhost:4000/Patients/addPatient", data);
        toast({
          title: "Patient added",
          description: "New patient added successfully.",
        });
      }

      fetchPatients();
      setIsAddPatientOpen(false);
      setEditingPatient(null);
    } catch (error) {
      console.error("Error saving patient:", error);
      toast({
        variant: "destructive",
        title: "Error saving patient",
        description: "Failed to add or update the patient. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Patients/deletePatient/${id}`);
      fetchPatients();
      toast({
        title: "Patient deleted",
        description: `Patient ${id} deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast({
        variant: "destructive",
        title: "Error deleting patient",
        description: "Failed to delete the patient. Please try again.",
      });
    }
  };

  return (
    <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Patients</h1>
            <p className="text-gray-600">Manage patient records and information</p>
          </div>

          <Dialog
            open={isAddPatientOpen}
            onOpenChange={(open) => {
              setIsAddPatientOpen(open);
              if (!open) setEditingPatient(null);
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setEditingPatient(null);
                  setIsAddPatientOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingPatient ? "Update Patient" : "Add New Patient"}
                </DialogTitle>
              </DialogHeader>
              <AddPatientForm
                onSubmit={handleAddOrUpdatePatient}
                initialData={editingPatient}
                onClose={() => setIsAddPatientOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center mb-5 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search patients by name..."
                className="pl-9 border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  All Patients
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Patients</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Sl No</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Gender</th>
                  <th className="px-6 py-3 text-left">Contact</th>
                  <th className="px-6 py-3 text-left">Blood Type</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient,index) => (
                  <tr key={patient._id}>
                    <td className="px-6 py-3">{index+1}</td>
                    <td className="px-6 py-3">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-3">{patient.gender}</td>
                    <td className="px-6 py-3">{patient.contactNumber}</td>
                    <td className="px-6 py-3">{patient.bloodType}</td>
                    <td className="px-6 py-3 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsViewDetailsOpen(true);
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingPatient(patient);
                          setIsAddPatientOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(patient._id)}
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
