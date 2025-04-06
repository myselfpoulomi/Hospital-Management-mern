import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // import Input component
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DoctorsList from "./DoctorsList";
import RegisterDoctorDialog from "./RegisterDoctorDialog";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DoctorsPage = () => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // search state
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Doctor registered",
      description: "The doctor has been successfully registered.",
    });
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <DashboardLayout className="w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Doctors</h1>
            <p className="text-gray-600">
              Manage hospital doctors and specialists
            </p>
          </div>
           {/* Search Bar */}
        <div className="w-[900px]">
          <Input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-full"
          />
        </div>
          <Button
            onClick={() => setIsRegisterDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register Doctor
          </Button>
        </div>


        <DoctorsList refresh={refreshKey} search={searchQuery} />

        <RegisterDoctorDialog
          open={isRegisterDialogOpen}
          onOpenChange={setIsRegisterDialogOpen}
          onSuccess={handleSuccess}
        />
      </div>
    </DashboardLayout>
  );
};

export default DoctorsPage;
