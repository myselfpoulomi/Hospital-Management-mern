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
  { name: "Doctor Schedules", icon: Calendar, path: "/doctor-schedules" },
  { name: "Medicine Management", icon: Pill, path: "/medicine" },
  { name: "Bed Status", icon: BedDouble, path: "/bed-status" },
  { name: "Financial", icon: DollarSign, path: "/financial" },
  { name: "Patients", icon: User, path: "/patients" },
  { name: "Reports", icon: Clipboard, path: "/reports" },
  { name: "Activities", icon: Activity, path: "/activities" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-medical-primary flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <span className="text-xl font-bold text-medical-gray-800">HealthBoard</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="px-3">
        <div className="mb-6 mt-2">
          <div className="text-xs uppercase font-semibold text-medical-gray-500 tracking-wider px-3 mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? "bg-medical-primary text-white"
                    : "text-medical-gray-700 hover:bg-medical-light hover:text-medical-primary"
                }`}
              >
                <item.icon
                  size={18}
                  className={`$${
                    currentPath === item.path ? "text-white" : "text-medical-gray-500"
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
            <div className="text-sm font-medium text-medical-gray-800">Dr. Smith</div>
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
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
