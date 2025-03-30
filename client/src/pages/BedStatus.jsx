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
  {
    id: "general",
    name: "General Ward",
    totalBeds: 120,
    occupied: 95,
    available: 25,
    occupancyRate: 79,
  },
  {
    id: "private",
    name: "Private Rooms",
    totalBeds: 40,
    occupied: 28,
    available: 12,
    occupancyRate: 70,
  },
  {
    id: "icu",
    name: "Intensive Care Unit",
    totalBeds: 30,
    occupied: 28,
    available: 2,
    occupancyRate: 93,
  },
  {
    id: "ccu",
    name: "Cardiac Care Unit",
    totalBeds: 20,
    occupied: 15,
    available: 5,
    occupancyRate: 75,
  },
  {
    id: "picu",
    name: "Pediatric ICU",
    totalBeds: 20,
    occupied: 14,
    available: 6,
    occupancyRate: 70,
  },
  {
    id: "nicu",
    name: "Neonatal ICU",
    totalBeds: 25,
    occupied: 20,
    available: 5,
    occupancyRate: 80,
  },
  {
    id: "emergency",
    name: "Emergency Ward",
    totalBeds: 40,
    occupied: 22,
    available: 18,
    occupancyRate: 55,
  },
  {
    id: "maternity",
    name: "Maternity Ward",
    totalBeds: 30,
    occupied: 24,
    available: 6,
    occupancyRate: 80,
  },
];

const occupiedBeds = [
  {
    bedId: "GW-101",
    patient: "John Smith",
    admissionDate: "2023-06-10",
    estimatedDischarge: "2023-06-17",
    doctor: "Dr. Emily Johnson",
    department: "General Ward",
  },
  {
    bedId: "GW-105",
    patient: "Maria Garcia",
    admissionDate: "2023-06-12",
    estimatedDischarge: "2023-06-19",
    doctor: "Dr. Sarah Williams",
    department: "General Ward",
  },
  {
    bedId: "ICU-03",
    patient: "Robert Brown",
    admissionDate: "2023-06-14",
    estimatedDischarge: "2023-06-21",
    doctor: "Dr. Michael Chen",
    department: "Intensive Care Unit",
  },
  {
    bedId: "PR-12",
    patient: "Elizabeth Davis",
    admissionDate: "2023-06-13",
    estimatedDischarge: "2023-06-18",
    doctor: "Dr. Robert Garcia",
    department: "Private Rooms",
  },
];

const BedStatus = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-medical-gray-900 text-blue-600">Bed Status</h1>
        <p className="text-medical-gray-600">
          Monitor and manage hospital bed availability
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medical-gray-500" />
              <Input
                placeholder="Search bed ID or patient name..."
                className="pl-9"
              />
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
              <Button className="bg-medical-primary hover:bg-medical-primary/90">
                Add Admission
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-medical-primary mb-2">
              325
            </div>
            <div className="text-medical-gray-500 text-sm text-center">
              Total Beds
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-medical-danger mb-2">
              246
            </div>
            <div className="text-medical-gray-500 text-sm text-center">
              Occupied Beds
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-medical-success mb-2">
              79
            </div>
            <div className="text-medical-gray-500 text-sm text-center">
              Available Beds
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Bed Occupancy by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {bedCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <div>
                        <span className="font-medium text-medical-gray-800">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-medical-gray-500">
                        {category.occupied}/{category.totalBeds}
                      </div>
                    </div>
                    <Progress
                      value={category.occupancyRate}
                      className="h-2"
                      indicatorClassName={
                        category.occupancyRate > 90
                          ? "bg-medical-danger"
                          : category.occupancyRate > 70
                          ? "bg-medical-warning"
                          : "bg-medical-success"
                      }
                    />
                    <div className="flex justify-between text-xs">
                      <div className="text-medical-gray-500">
                        Occupancy: {category.occupancyRate}%
                      </div>
                      <div
                        className={`font-medium ${
                          category.available < 5
                            ? "text-medical-danger"
                            : "text-medical-success"
                        }`}
                      >
                        {category.available} Available
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Today's Bed Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-medical-success mr-2"></div>
                    <span className="text-sm text-medical-gray-600">
                      Available
                    </span>
                  </div>
                  <span className="font-medium">79</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-medical-danger mr-2"></div>
                    <span className="text-sm text-medical-gray-600">
                      Occupied
                    </span>
                  </div>
                  <span className="font-medium">246</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-medical-warning mr-2"></div>
                    <span className="text-sm text-medical-gray-600">
                      Reserved
                    </span>
                  </div>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-medical-gray-300 mr-2"></div>
                    <span className="text-sm text-medical-gray-600">
                      Maintenance
                    </span>
                  </div>
                  <span className="font-medium">8</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-medical-gray-700 mb-4">
                  Today's Activities
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Badge className="bg-green-100 text-green-800 mr-2">
                      +8
                    </Badge>
                    <span className="text-medical-gray-600">
                      New admissions
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">+5</Badge>
                    <span className="text-medical-gray-600">
                      Transfers between departments
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Badge className="bg-orange-100 text-orange-800 mr-2">
                      -12
                    </Badge>
                    <span className="text-medical-gray-600">Discharges</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-medium">
            Current Occupancies
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="occupied">
            <TabsList className="mb-4">
              <TabsTrigger value="occupied">Occupied Beds</TabsTrigger>
              <TabsTrigger value="available">Available Beds</TabsTrigger>
              <TabsTrigger value="reserved">Reserved Beds</TabsTrigger>
            </TabsList>

            <TabsContent value="occupied" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {occupiedBeds.map((bed) => (
                  <Card
                    key={bed.bedId}
                    className="border-l-4 border-l-medical-danger"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <BedDouble
                            size={16}
                            className="text-medical-danger mr-2"
                          />
                          <span className="font-medium">{bed.bedId}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-medical-danger border-medical-danger"
                        >
                          Occupied
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User
                            size={14}
                            className="mr-2 text-medical-gray-400"
                          />
                          <span className="text-medical-gray-800 font-medium">
                            {bed.patient}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-medical-gray-500">
                          <Calendar
                            size={12}
                            className="mr-2 text-medical-gray-400"
                          />
                          <span>Admitted: {bed.admissionDate}</span>
                        </div>
                        <div className="flex items-center text-xs text-medical-gray-500">
                          <Calendar
                            size={12}
                            className="mr-2 text-medical-gray-400"
                          />
                          <span>Est. Discharge: {bed.estimatedDischarge}</span>
                        </div>
                        <div className="text-xs text-medical-gray-500">
                          {bed.doctor} · {bed.department}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-medical-primary hover:text-medical-primary/90 hover:bg-medical-light"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="available" className="mt-0">
              <div className="p-8 text-center text-medical-gray-500">
                <BedDouble
                  size={48}
                  className="mx-auto mb-4 text-medical-gray-300"
                />
                <p>
                  There are 79 available beds across all departments. <br />
                  Use the filter above to view available beds by department.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reserved" className="mt-0">
              <div className="p-8 text-center text-medical-gray-500">
                <BedDouble
                  size={48}
                  className="mx-auto mb-4 text-medical-gray-300"
                />
                <p>
                  There are 12 reserved beds for upcoming admissions. <br />
                  Use the filter above to view reserved beds by department.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BedStatus;
