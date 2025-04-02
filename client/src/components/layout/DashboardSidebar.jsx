import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Activity,
  Calendar,
  FileText,
  Home,
  Pill,
  DollarSign,
  Clipboard,
  User,
  Settings,
  LogOut,
  BedDouble,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Prescriptions", icon: FileText, path: "/prescriptions" },
  { name: "Doctors", icon: Calendar, path: "/doctors" },
  { name: "Medicine Management", icon: Pill, path: "/medicine" },
  { name: "Bed Status", icon: BedDouble, path: "/bed-status" },
  { name: "Financial", icon: DollarSign, path: "/financial" },
  { name: "Patients", icon: User, path: "/patients" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[25px] font-bold text-medical-gray-800 text-blue-700">
            HealthBoard
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <div className="mb-6 mt-2">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
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
                  className={`$${
                    currentPath === item.path
                      ? "text-white"
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
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-medical-primary text-white">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-sm font-semibold text-medical-gray-800 text-black">
              Dr. Smith
            </div>
            <div className="text-xs text-medical-gray-500">Administrator</div>
          </div>
        </div>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-medical-gray-600 hover:text-medical-gray-900"
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-medical-gray-600 hover:text-medical-gray-900"
          >
            <Link to="/login" className="flex items-center">
            <LogOut size={16} className="mr-2" />
            Logout
            </Link>
           
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
