import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DoctorsList = ({ refresh }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="hover:shadow-md transition-shadow p-3">
          <CardHeader className="p-2">
            <CardTitle className="text-xl">{doctor.full_name}</CardTitle>
            <CardDescription>{doctor.degree}</CardDescription>
            <p className="text-sm text-gray-500 mt-1">ID: {doctor.doctor_id}</p> {/* ✅ Doctor ID */}
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Specialization</span>
                <span className="text-sm">{doctor.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Patients</span>
                <span className="text-sm">{doctor.patient_count}</span>
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
                  {doctor.status || "Active"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorsList;
