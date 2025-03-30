import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, User, Plus, MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schedules = [
  { id: 1, doctor: "Dr. Emily Johnson", specialty: "Cardiology", date: "2023-06-16", startTime: "09:00 AM", endTime: "02:00 PM", patients: 12, status: "Active" },
  { id: 2, doctor: "Dr. Michael Chen", specialty: "Neurology", date: "2023-06-16", startTime: "10:30 AM", endTime: "04:30 PM", patients: 8, status: "Active" },
  { id: 3, doctor: "Dr. Sarah Williams", specialty: "Pediatrics", date: "2023-06-16", startTime: "08:00 AM", endTime: "01:00 PM", patients: 15, status: "Active" },
  { id: 4, doctor: "Dr. Robert Garcia", specialty: "Orthopedics", date: "2023-06-16", startTime: "01:00 PM", endTime: "07:00 PM", patients: 10, status: "Active" },
  { id: 5, doctor: "Dr. Lisa Patel", specialty: "Dermatology", date: "2023-06-17", startTime: "09:00 AM", endTime: "03:00 PM", patients: 14, status: "Upcoming" },
  { id: 6, doctor: "Dr. James Wilson", specialty: "Gastroenterology", date: "2023-06-17", startTime: "10:00 AM", endTime: "05:00 PM", patients: 9, status: "Upcoming" },
  { id: 7, doctor: "Dr. Amanda Lee", specialty: "Endocrinology", date: "2023-06-15", startTime: "08:30 AM", endTime: "02:30 PM", patients: 11, status: "Completed" },
  { id: 8, doctor: "Dr. David Kim", specialty: "Psychiatry", date: "2023-06-15", startTime: "11:00 AM", endTime: "06:00 PM", patients: 7, status: "Completed" },
];

const DoctorSchedules = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-medical-gray-900">Doctor Schedules</h1>
          <p className="text-medical-gray-600">Manage doctor routines and appointments</p>
        </div>
        <Button className="bg-medical-primary hover:bg-medical-primary/90">
          <Plus size={16} className="mr-2" />
          Add Schedule
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Doctor Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="today">
              {schedules.filter(s => s.status === "Active").map(s => <ScheduleCard key={s.id} schedule={s} />)}
            </TabsContent>
            <TabsContent value="upcoming">
              {schedules.filter(s => s.status === "Upcoming").map(s => <ScheduleCard key={s.id} schedule={s} />)}
            </TabsContent>
            <TabsContent value="completed">
              {schedules.filter(s => s.status === "Completed").map(s => <ScheduleCard key={s.id} schedule={s} />)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

const ScheduleCard = ({ schedule }) => {
  return (
    <Card>
      <CardContent>
        <h3>{schedule.doctor}</h3>
        <p>{schedule.specialty}</p>
        <p>{schedule.date} - {schedule.startTime} to {schedule.endTime}</p>
        <p>{schedule.patients} patients</p>
        <Badge>{schedule.status}</Badge>
        <Button variant="outline">View Details</Button>
      </CardContent>
    </Card>
  );
};

export default DoctorSchedules;
