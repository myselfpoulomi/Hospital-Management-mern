import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BedIcon, Check, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const initialBeds = [
  { id: 1, roomNumber: "101-A", type: "ICU", status: "occupied", patient: "John Doe", admissionDate: "2025-04-30" },
  { id: 2, roomNumber: "101-B", type: "ICU", status: "available", patient: "", admissionDate: "" },
  { id: 3, roomNumber: "102-A", type: "General", status: "occupied", patient: "Jane Smith", admissionDate: "2025-05-01" },
  { id: 4, roomNumber: "102-B", type: "General", status: "maintenance", patient: "", admissionDate: "" },
  { id: 5, roomNumber: "103-A", type: "Private", status: "available", patient: "", admissionDate: "" },
  { id: 6, roomNumber: "103-B", type: "Private", status: "occupied", patient: "Robert Johnson", admissionDate: "2025-04-28" },
  { id: 7, roomNumber: "104-A", type: "Emergency", status: "available", patient: "", admissionDate: "" },
  { id: 8, roomNumber: "104-B", type: "Emergency", status: "occupied", patient: "Emily Davis", admissionDate: "2025-05-02" },
];

function BedStatus({ setIsAuthenticated }) {
  const [beds, setBeds] = useState(initialBeds);
  const [filter, setFilter] = useState("all");

  const filteredBeds = filter === "all" 
    ? beds 
    : beds.filter(bed => bed.status === filter);

  const getStatusStyling = (status) => {
    switch(status) {
      case "available":
        return { 
          bg: "bg-green-100", 
          text: "text-green-700", 
          icon: <Check className="h-4 w-4 text-green-600 mr-1" /> 
        };
      case "occupied":
        return { 
          bg: "bg-blue-100", 
          text: "text-blue-700",
          icon: <BedIcon className="h-4 w-4 text-blue-600 mr-1" />
        };
      case "maintenance":
        return { 
          bg: "bg-amber-100", 
          text: "text-amber-700",
          icon: <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
        };
      default:
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-700",
          icon: null
        };
    }
  };

  return (
    <DashboardLayout setIsAuthenticated={setIsAuthenticated}>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Bed Status Management</h1>
          <p className="text-gray-600">Monitor and manage hospital bed availability</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-600" : ""}
            >
              All Beds
            </Button>
            <Button 
              variant={filter === "available" ? "default" : "outline"} 
              onClick={() => setFilter("available")}
              className={filter === "available" ? "bg-green-600" : ""}
            >
              Available
            </Button>
            <Button 
              variant={filter === "occupied" ? "default" : "outline"} 
              onClick={() => setFilter("occupied")}
              className={filter === "occupied" ? "bg-blue-600" : ""}
            >
              Occupied
            </Button>
            <Button 
              variant={filter === "maintenance" ? "default" : "outline"} 
              onClick={() => setFilter("maintenance")}
              className={filter === "maintenance" ? "bg-amber-600" : ""}
            >
              Maintenance
            </Button>
          </div>
          
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Bed
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed ID</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Bed Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeds.map((bed) => {
                const statusStyle = getStatusStyling(bed.status);
                
                return (
                  <TableRow key={bed.id}>
                    <TableCell className="font-medium">{bed.id}</TableCell>
                    <TableCell>{bed.roomNumber}</TableCell>
                    <TableCell>{bed.type}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} text-xs font-medium`}>
                        {statusStyle.icon}
                        {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{bed.patient || "-"}</TableCell>
                    <TableCell>{bed.admissionDate || "-"}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredBeds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No beds found with the selected filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredBeds.length} of {beds.length} beds
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default BedStatus;
