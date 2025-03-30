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
import { FileText, Plus, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const prescriptions = [
  {
    id: "PRE-2023-001",
    patient: "John Smith",
    doctor: "Dr. Emily Johnson",
    date: "2023-06-15",
    status: "Completed",
  },
  {
    id: "PRE-2023-002",
    patient: "Sarah Johnson",
    doctor: "Dr. Michael Chen",
    date: "2023-06-15",
    status: "Pending",
  },
  {
    id: "PRE-2023-003",
    patient: "Robert Williams",
    doctor: "Dr. Sarah Williams",
    date: "2023-06-14",
    status: "Completed",
  },
  {
    id: "PRE-2023-004",
    patient: "Maria Garcia",
    doctor: "Dr. Emily Johnson",
    date: "2023-06-14",
    status: "Completed",
  },
  {
    id: "PRE-2023-005",
    patient: "James Brown",
    doctor: "Dr. Robert Garcia",
    date: "2023-06-13",
    status: "Cancelled",
  },
  {
    id: "PRE-2023-006",
    patient: "Elizabeth Davis",
    doctor: "Dr. Michael Chen",
    date: "2023-06-13",
    status: "Pending",
  },
];

const Prescriptions = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-medical-gray-900 text-blue-600">
            Prescriptions
          </h1>
          <p className="text-medical-gray-600">
            Manage and generate patient prescriptions
          </p>
        </div>
        <Button className="bg-medical-primary hover:bg-medical-primary/90 bg-blue-500">
          <Plus size={16} className="mr-2" />
          New Prescription
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-9 border border-gray-300"
              />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-medical-gray-500" />
                    <SelectValue
                      placeholder="Status"
                      className="whitespace-nowrap"
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
          <CardTitle className="text-lg font-medium">
            Recent Prescriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">
                    {prescription.id}
                  </TableCell>
                  <TableCell>{prescription.patient}</TableCell>
                  <TableCell>{prescription.doctor}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        prescription.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : prescription.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {prescription.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-medical-primary hover:text-medical-primary/90 hover:bg-medical-light"
                    >
                      <FileText size={16} className="mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Prescriptions;
