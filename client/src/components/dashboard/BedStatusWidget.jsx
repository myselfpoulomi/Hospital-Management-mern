import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const bedData = [
  {
    type: "General",
    total: 120,
    occupied: 95,
    available: 25,
  },
  {
    type: "ICU",
    total: 30,
    occupied: 28,
    available: 2,
  },
  {
    type: "Emergency",
    total: 40,
    occupied: 22,
    available: 18,
  },
  {
    type: "Pediatric",
    total: 25,
    occupied: 18,
    available: 7,
  },
];

const BedStatusWidget = () => {
  const totalBeds = bedData.reduce((acc, bed) => acc + bed.total, 0);
  const totalOccupied = bedData.reduce((acc, bed) => acc + bed.occupied, 0);
  const occupancyRate = Math.round((totalOccupied / totalBeds) * 100);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Bed Status</CardTitle>
        <div className="rounded-full bg-medical-light px-2 py-1 text-xs font-medium text-medical-primary">
          {occupancyRate}% Occupancy
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bedData.map((bed) => (
            <div key={bed.type} className="space-y-1">
              <div className="flex justify-between text-sm">
                <div className="font-medium text-medical-gray-700">{bed.type}</div>
                <div className="text-medical-gray-500">
                  {bed.occupied} / {bed.total}
                </div>
              </div>
              <Progress
                value={(bed.occupied / bed.total) * 100}
                className="h-2"
                indicatorClassName={
                  (bed.occupied / bed.total) * 100 > 90
                    ? "bg-medical-danger"
                    : (bed.occupied / bed.total) * 100 > 70
                    ? "bg-medical-warning"
                    : "bg-medical-success"
                }
              />
              <div className="flex justify-between text-xs text-medical-gray-500">
                <div>Occupied: {bed.occupied}</div>
                <div>Available: {bed.available}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BedStatusWidget;
