import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Prescriptions from "./pages/Prescriptions";
import DoctorSchedules from "./pages/DoctorSchedules";
import Medicine from "./pages/Medicine";
import BedStatus from "./pages/BedStatus";
import Financial from "./pages/Financial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/doctor-schedules" element={<DoctorSchedules />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/bed-status" element={<BedStatus />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
