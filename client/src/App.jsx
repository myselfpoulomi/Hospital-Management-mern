import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Prescriptions from "./pages/Prescription/Prescriptions";
import DoctorSchedules from "./pages/DoctorSchedules";
import Medicine from "./pages/Medicine";
import Staff from "./pages/Staff/Staff";
import Financial from "./pages/Financial";
import NotFound from "./pages/NotFound";

import { LogIn } from "lucide-react";
import Login from "./pages/Login";
import PatientsPage from "./pages/Patient/PatientsPage";
import DoctorsPage from "./pages/Doctor/DoctorsPage";
import PrescriptionDetails from "./pages/Prescription/PrescriptionDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/prescription/:id" element={<PrescriptionDetails />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
