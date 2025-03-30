import React from "react";
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
import {
  Search,
  Plus,
  Filter,
  Download,
  Pill,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

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
  {
    id: "MED-004",
    name: "Insulin Regular",
    category: "Hormones",
    stock: 125,
    reorderLevel: 100,
    supplier: "DiabeCare",
    expiryDate: "2023-12-10",
    status: "Low Stock",
  },
  {
    id: "MED-005",
    name: "Losartan 50mg",
    category: "Antihypertensives",
    stock: 850,
    reorderLevel: 200,
    supplier: "GlobalMed",
    expiryDate: "2024-03-18",
    status: "In Stock",
  },
  {
    id: "MED-006",
    name: "Salbutamol Inhaler",
    category: "Respiratory",
    stock: 320,
    reorderLevel: 100,
    supplier: "RespiCare",
    expiryDate: "2024-06-05",
    status: "In Stock",
  },
  {
    id: "MED-007",
    name: "Epinephrine 1mg",
    category: "Emergency",
    stock: 50,
    reorderLevel: 50,
    supplier: "EmergMed",
    expiryDate: "2023-11-30",
    status: "Low Stock",
  },
  {
    id: "MED-008",
    name: "Morphine 10mg",
    category: "Analgesics",
    stock: 0,
    reorderLevel: 30,
    supplier: "PainRelief Inc",
    expiryDate: "2024-01-15",
    status: "Out of Stock",
  },
];

const categories = [
  { name: "Analgesics", count: 28 },
  { name: "Antibiotics", count: 35 },
  { name: "Antihypertensives", count: 22 },
  { name: "Hormones", count: 15 },
  { name: "Respiratory", count: 18 },
  { name: "Emergency", count: 12 },
  { name: "Cardiovascular", count: 25 },
  { name: "Dermatological", count: 20 },
];

const Medicine = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-medical-gray-900">
            Medicine Management
          </h1>
          <p className="text-medical-gray-600">
            Monitor and manage hospital medicine inventory
          </p>
        </div>
        <Button className="bg-medical-primary hover:bg-medical-primary/90">
          <Plus size={16} className="mr-2" />
          Add Medicine
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
                  <Input placeholder="Search medicines..." className="pl-9" />
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <span className="flex items-center">
                        <Filter size={14} className="mr-2 text-medical-gray-500" />
                        <SelectValue placeholder="Status" />
                      </span>
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Medicine Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
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
                          className={`${
                            medicine.status === "In Stock"
                              ? "bg-green-50 text-green-600"
                              : medicine.status === "Low Stock"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-red-50 text-red-600"
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Medicine;