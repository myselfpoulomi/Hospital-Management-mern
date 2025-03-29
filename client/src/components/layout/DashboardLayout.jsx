import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-5 shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-medical-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-medical-gray-800">{value}</h3>
        </div>
        <div className="p-2 rounded-md bg-medical-light text-medical-primary">
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-3 flex items-center">
          {change.type === "increase" ? (
            <ArrowUp className="h-4 w-4 text-medical-success mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-medical-danger mr-1" />
          )}
          <span
            className={`text-xs font-medium ${
              change.type === "increase"
                ? "text-medical-success"
                : "text-medical-danger"
            }`}
          >
            {change.value} from last period
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
