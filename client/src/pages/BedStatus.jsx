import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, BedDouble, User, Calendar } from "lucide-react";

const bedCategories = [
  { id: "general", name: "General Ward", totalBeds: 120, occupied: 95, available: 25, occupancyRate: 79 },
  { id: "private", name: "Private Rooms", totalBeds: 40, occupied: 28, available: 12, occupancyRate: 70 },
  { id: "icu", name: "Intensive Care Unit", totalBeds: 30, occupied: 28, available: 2, occupancyRate: 93 },
  { id: "ccu", name: "Cardiac Care Unit", totalBeds: 20, occupied: 15, available: 5, occupancyRate: 75 },
  { id: "picu", name: "Pediatric ICU", totalBeds: 20, occupied: 14, available: 6, occupancyRate: 70 },
  { id: "nicu", name: "Neonatal ICU", totalBeds: 25, occupied: 20, available: 5, occupancyRate: 80 },
  { id: "emergency", name: "Emergency Ward", totalBeds: 40, occupied: 22, available: 18, occupancyRate: 55 },
  { id: "maternity", name: "Maternity Ward", totalBeds: 30, occupied: 24, available: 6, occupancyRate: 80 },
];

const occupiedBeds = [
  { bedId: "GW-101", patient: "John Smith", admissionDate: "2023-06-10", estimatedDischarge: "2023-06-17", doctor: "Dr. Emily Johnson", department: "General Ward" },
  { bedId: "GW-105", patient: "Maria Garcia", admissionDate: "2023-06-12", estimatedDischarge: "2023-06-19", doctor: "Dr. Sarah Williams", department: "General Ward" },
  { bedId: "ICU-03", patient: "Robert Brown", admissionDate: "2023-06-14", estimatedDischarge: "2023-06-21", doctor: "Dr. Michael Chen", department: "Intensive Care Unit" },
  { bedId: "PR-12", patient: "Elizabeth Davis", admissionDate: "2023-06-13", estimatedDischarge: "2023-06-18", doctor: "Dr. Robert Garcia", department: "Private Rooms" },
];

const BedStatus = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-medical-gray-900">Bed Status</h1>
        <p className="text-medical-gray-600">Monitor and manage hospital bed availability</p>
      </div>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
              <Input placeholder="Search bed ID or patient name..." className="pl-9" />
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[170px]">
                  <span className="flex items-center">
                    <Filter size={14} className="mr-2 text-medical-gray-500" />
                    <SelectValue placeholder="All Departments" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="general">General Ward</SelectItem>
                  <SelectItem value="private">Private Rooms</SelectItem>
                  <SelectItem value="icu">Intensive Care Unit</SelectItem>
                  <SelectItem value="emergency">Emergency Ward</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-medical-primary hover:bg-medical-primary/90">Add Admission</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BedStatus;
