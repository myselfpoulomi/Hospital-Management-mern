import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DoctorsList from "./DoctorsList";
import RegisterDoctorDialog from "./RegisterDoctorDialog";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DoctorsPage = () => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <DashboardLayout className="w-full">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
            <p className="text-gray-600">
              Manage hospital doctors and specialists
            </p>
          </div>
          <Button
            onClick={() => setIsRegisterDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register Doctor
          </Button>
        </div>

        <DoctorsList />

        <RegisterDoctorDialog
          open={isRegisterDialogOpen}
          onOpenChange={setIsRegisterDialogOpen}
          onSuccess={() => {
            toast({
              title: "Doctor registered",
              description: "The doctor has been successfully registered.",
            });
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default DoctorsPage;
