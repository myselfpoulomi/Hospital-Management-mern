import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddMedicineForm from "./Medicine/AddMedicineForm";
import { Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Funnel, Download } from "lucide-react";

const Medicine = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All Medicine");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:4000/medicine/");
      setMedicines(response.data);
      setAllMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleMedicineAdded = () => {
    fetchMedicines();
    setIsAddDialogOpen(false);
    setSelectedMedicine(null);
  };

  const handleMedicineDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/medicine/deleteMedicine/${_id}`);
      setMedicines((prev) => prev.filter((m) => m._id !== _id));
      setAllMedicines((prev) => prev.filter((m) => m._id !== _id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setIsAddDialogOpen(true);
  };

  // Apply search + filter logic
  const filteredMedicines = allMedicines.filter((medicine) => {
    const matchesSearch = medicine.medicineName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All Medicine" || medicine.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout className="w-full">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-blue-700">Medicine Management</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage hospital medicine inventory</p>
        </div>
        <Button className="bg-blue-600" onClick={() => setIsAddDialogOpen(true)}>
          + Add Medicine
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <Input
          placeholder="Search medicines..."
          className="md:w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Funnel className="h-4 w-4" /> {filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("All Medicine")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("In Stock")}>In Stock</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("Low Stock")}>Low Stock</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("Out of Stock")}>Out of Stock</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.map((medicine) => (
                  <TableRow key={medicine._id}>
                    <TableCell>{medicine.medicineId}</TableCell>
                    <TableCell>{medicine.medicineName}</TableCell>
                    <TableCell>{medicine.category}</TableCell>
                    <TableCell className="text-right">{medicine.stockQuantity}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          medicine.status === "In Stock"
                            ? "bg-green-100 text-green-600"
                            : medicine.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }
                      >
                        {medicine.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(medicine.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(medicine)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMedicineDelete(medicine._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddMedicineForm
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setSelectedMedicine(null);
        }}
        onMedicineAdded={handleMedicineAdded}
        selectedMedicine={selectedMedicine}
      />
    </DashboardLayout>
  );
};

export default Medicine;
