import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  

  return (
<Button 
  asChild 
  variant="outline" 
  size="sm" 
  className="w-full bg-blue-700 text-white transition-colors duration-300 ease-in-out hover:bg-gray-500"
>
      <Link to="/" className="flex items-center">
        <LogIn className="mr-2 h-4 w-4" />
        Admin Login
      </Link>
    </Button>
  );
};

export default LoginButton;
