import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddMedicineForm from "./Medicine/AddMedicineForm";

const Medicine = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:4000/medicine/");
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleMedicineAdded = (newMedicine) => {
    // Add the new medicine to the state after adding it
    setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Medicine Inventory</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>+ Add Medicine</Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine.medicineId}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddMedicineForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onMedicineAdded={handleMedicineAdded}  // Pass the callback to the form
      />
    </DashboardLayout>
  );
};

export default Medicine;
