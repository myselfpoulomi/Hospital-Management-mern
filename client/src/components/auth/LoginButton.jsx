import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      asChild 
      variant="outline" 
      size="sm" 
      className="w-full bg-blue-700" 
      
    >
      <Link to="/" className="flex items-center">
        <LogIn className="mr-2 h-4 w-4" />
        Admin Login
      </Link>
    </Button>
  );
};

export default LoginButton;
