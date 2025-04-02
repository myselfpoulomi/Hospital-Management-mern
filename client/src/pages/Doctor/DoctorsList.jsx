import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    degree: "MD, PhD",
    specialization: "Cardiology",
    patients: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    degree: "MBBS, MS",
    specialization: "Neurology",
    patients: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    degree: "MD",
    specialization: "Pediatrics",
    patients: 15,
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Robert Garcia",
    degree: "MD, MS",
    specialization: "Orthopedics",
    patients: 10,
    status: "Active",
  },
];

const DoctorsList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {doctors.map((doctor) => (
      <Card key={doctor.id} className="hover:shadow-md transition-shadow p-3">
        <CardHeader className="p-2">
          <CardTitle className="text-xl">{doctor.name}</CardTitle>
          <CardDescription>{doctor.degree}</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Specialization</span>
              <span className="text-sm">{doctor.specialization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Current Patients</span>
              <span className="text-sm">{doctor.patients}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium">Status</span>
              <Badge 
                variant="outline" 
                className={`${
                  doctor.status === "Active" 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {doctor.status}
              </Badge>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
          <Button variant="outline" className="w-full">View Details</Button>
        </CardFooter> */}
      </Card>
    ))}
  </div>
);

export default DoctorsList;
