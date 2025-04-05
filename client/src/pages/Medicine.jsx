import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AddMedicineForm from "./Medicine/AddMedicineForm.jsx"; // Update the path

const medicines = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Analgesics",
    stock: 2500,
    reorderLevel: 500,
    supplier: "PharmaCare Ltd",
    expiryDate: "2024-05-30",
    status: "In Stock",
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 1200,
    reorderLevel: 300,
    supplier: "MediSupply Inc",
    expiryDate: "2024-02-15",
    status: "In Stock",
  },
  {
    id: "MED-003",
    name: "Lisinopril 10mg",
    category: "Antihypertensives",
    stock: 450,
    reorderLevel: 200,
    supplier: "GlobalMed",
    expiryDate: "2024-08-20",
    status: "Low Stock",
  },
];

const Medicine = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <DashboardLayout className="w-full">
      <div className="flex-1 w-full flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-medical-gray-900 text-blue-600">
            Medicine Management
          </h1>
          <p className="text-medical-gray-600">
            Monitor and manage hospital medicine inventory
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-medical-primary hover:bg-medical-primary/90 bg-blue-500"
        >
          <Plus size={16} className="mr-2" />
          Add Medicine
        </Button>
      </div>

      <div className="flex gap-6 mb-6 w-full flex-1">
        <div className="w-full">
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
                  <Input placeholder="Search medicines..." className="pl-9" />
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center">
                        <Filter size={14} className="mr-2 text-medical-gray-500" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download size={14} className="mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-5 w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Medicine Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell>{medicine.id}</TableCell>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{medicine.category}</TableCell>
                        <TableCell className="text-right">{medicine.stock}</TableCell>
                        <TableCell>
                          <Badge
                            className={`transition-colors duration-300 ease-in-out cursor-pointer ${
                              medicine.status === "In Stock"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : medicine.status === "Low Stock"
                                ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {medicine.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{medicine.expiryDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Medicine Dialog */}
      <AddMedicineForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Medicine;
