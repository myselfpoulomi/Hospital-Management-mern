import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

const todaySchedules = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Cardiology",
    time: "9:00 AM - 2:00 PM",
    patients: 12,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    time: "10:30 AM - 4:30 PM",
    patients: 8,
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialty: "Pediatrics",
    time: "8:00 AM - 1:00 PM",
    patients: 15,
  },
  {
    id: 4,
    name: "Dr. Robert Garcia",
    specialty: "Orthopedics",
    time: "1:00 PM - 7:00 PM",
    patients: 10,
  },
];

const DoctorScheduleWidget = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Today's Doctor Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todaySchedules.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={doctor.avatar} />
                  <AvatarFallback className="bg-medical-primary/10 text-medical-primary">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-medical-gray-800">
                    {doctor.name}
                  </h4>
                  <p className="text-sm text-medical-gray-500">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-medical-gray-600">
                  <Clock size={14} className="mr-1" />
                  {doctor.time}
                </div>
                <p className="text-xs text-medical-gray-500">
                  {doctor.patients} patients
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorScheduleWidget;
