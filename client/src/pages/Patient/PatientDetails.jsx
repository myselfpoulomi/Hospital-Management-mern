import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Pill, Activity, Clock, Edit } from "lucide-react";

const PatientDetails = ({ patient }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{patient.name}</h2>
          <p className="text-sm text-gray-500">ID: {patient.id}</p>
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Gender", value: patient.gender },
          { label: "Age", value: `${patient.age} years` },
          { label: "Contact Number", value: patient.contactNumber },
          { label: "Email", value: patient.email },
          { label: "Address", value: patient.address },
          { label: "Blood Type", value: patient.bloodType },
        ].map((item, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="appointments">
        <TabsList className="w-full border-b">
          {[
            { value: "appointments", label: "Appointments", icon: <Calendar className="h-4 w-4" /> },
            { value: "prescriptions", label: "Prescriptions", icon: <FileText className="h-4 w-4" /> },
            { value: "medications", label: "Medications", icon: <Pill className="h-4 w-4" /> },
            { value: "vitals", label: "Vitals", icon: <Activity className="h-4 w-4" /> },
            { value: "history", label: "History", icon: <Clock className="h-4 w-4" /> },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="appointments" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Upcoming Appointments</h3>
              <Button variant="outline" size="sm">Add Appointment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Prescriptions</h3>
              <Button variant="outline" size="sm">Add Prescription</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Current Medications</h3>
              <Button variant="outline" size="sm">Add Medication</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Vital Signs</h3>
              <Button variant="outline" size="sm">Record Vitals</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Medical History</h3>
              <Button variant="outline" size="sm">Add Record</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    
  );
};

export default PatientDetails;
