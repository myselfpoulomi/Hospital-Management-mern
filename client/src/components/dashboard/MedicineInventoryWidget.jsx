import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const medicines = [
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    stock: 2345,
    status: "In Stock",
  },
  {
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    stock: 1200,
    status: "In Stock",
  },
  {
    name: "Lisinopril 10mg",
    category: "Antihypertensive",
    stock: 450,
    status: "Low",
  },
  {
    name: "Insulin Regular",
    category: "Hormone",
    stock: 125,
    status: "Low",
  },
  {
    name: "Epinephrine 1mg",
    category: "Emergency",
    stock: 50,
    status: "Critical",
  },
];

const MedicineInventoryWidget = () => {
  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Medicine Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 bg-medical-gray-100 p-3 text-xs font-medium text-medical-gray-700">
            <div className="col-span-5">Medicine</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Stock</div>
            <div className="col-span-2">Status</div>
          </div>
          <div className="divide-y w-full flex-1">
            {medicines.map((medicine, index) => (
              <div key={index} className="grid grid-cols-12 items-center p-3 text-sm">
                <div className="col-span-5 font-medium text-medical-gray-800">
                  {medicine.name}
                </div>
                <div className="col-span-3 text-medical-gray-600">{medicine.category}</div>
                <div className="col-span-2 text-medical-gray-600">{medicine.stock}</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        medicine.status === "In Stock"
                          ? "border-medical-success bg-green-50 text-medical-success"
                          : medicine.status === "Low"
                          ? "border-medical-warning bg-orange-50 text-medical-warning"
                          : "border-medical-danger bg-red-50 text-medical-danger"
                      }
                    `}
                  >
                    {medicine.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineInventoryWidget;
