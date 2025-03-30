import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Download,
  Pill,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Medicine = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-medical-gray-900">
            Medicine Management
          </h1>
          <p className="text-medical-gray-600">
            Monitor and manage hospital medicine inventory
          </p>
        </div>
        <Button className="bg-medical-primary hover:bg-medical-primary/90">
          <Plus size={16} className="mr-2" />
          Add Medicine
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Medicine;
