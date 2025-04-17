import React, { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children, setIsAuthenticated }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    setSession(session);
  }, []);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <DashboardSidebar setIsAuthenticated={setIsAuthenticated} session={session} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6 w-full flex-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
