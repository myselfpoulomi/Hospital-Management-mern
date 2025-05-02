import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  FileText,
  Home,
  Pill,
  DollarSign,
  User,
  LogOut,
  Users,
  Stethoscope,
  BedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Prescriptions", icon: FileText, path: "/prescriptions" },
  { name: "Doctors Deatils", icon: Stethoscope, path: "/doctors" },
  { name: "Medicine Management", icon: Pill, path: "/medicine" },
  { name: "Bed Status", icon: BedIcon, path: "/beds" }, // ✅ fixed path key
  { name: "Staff Details", icon: Users, path: "/staff" },
  { name: "Financial", icon: DollarSign, path: "/financial" },
  { name: "Patients Details", icon: User, path: "/patients" },
];

const DashboardSidebar = ({ setIsAuthenticated, session }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/login");
    setIsAuthenticated(false);
  };

  // Map route paths to access keys
  const accessMap = {
    "/": "dashboard",
    "/prescriptions": "prescription",
    "/doctors": "doctordetails",
    "/medicine": "medicinemanagement",
    "/beds": "bedstatus", // ✅ Must match
    "/staff": "staffdetails",
    "/financial": "financial",
    "/patients": "patientdetails",
  };
  

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[25px] font-bold text-medical-gray-800 text-blue-700">
            HealthHub
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <div className="mb-6 mt-2">
          <nav className="space-y-1">
            {sidebarItems
              .filter(
                (item) =>
                  item.path &&
                  session?.access?.[accessMap[item.path]] // ✅ ensure path and access key match
              )
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === item.path
                      ? "bg-medical-primary text-blue-700"
                      : "text-medical-gray-700 hover:bg-medical-light hover:text-medical-primary"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={`${
                      currentPath === item.path
                        ? "text-blue-700"
                        : "text-medical-gray-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              ))}
          </nav>
        </div>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4 border-t border-gray-200">
        <div className="flex items-center mb-4 px-3">
          <div className="ml-3">
            <div className="text-sm font-semibold text-medical-gray-800 text-black">
              {session?.username}
            </div>
            <div className="text-xs text-medical-gray-500">
              {session?.email}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-medical-gray-600 hover:text-medical-gray-900"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
