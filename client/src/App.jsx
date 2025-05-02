import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Prescriptions from "./pages/Prescription/Prescriptions";
import DoctorSchedules from "./pages/DoctorSchedules";
import Medicine from "./pages/Medicine";
import Staff from "./pages/Staff/Staff";
import Financial from "./pages/Financial";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner"
import Login from "./pages/Login";
import PatientsPage from "./pages/Patient/PatientsPage";
import DoctorsPage from "./pages/Doctor/DoctorsPage";
import PrescriptionDetails from "./pages/Prescription/PrescriptionDetails";
import { useState, useEffect } from "react";
import BedStatus from "./pages/BedStatus/BedStatus";
const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const session = JSON.parse(localStorage.getItem("session"));


  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [session]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/prescriptions" element={<Prescriptions setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/prescription/:id" element={isAuthenticated ? <PrescriptionDetails /> : <Navigate to="/login" />} />
          <Route path="/doctors" element={isAuthenticated ? <DoctorsPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/beds" element={isAuthenticated ? <BedStatus setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/medicine" element={isAuthenticated ? <Medicine setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/staff" element={isAuthenticated ? <Staff setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/financial" element={isAuthenticated ? <Financial setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isAuthenticated ? <PatientsPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
}

export default App;
