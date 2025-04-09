import React, { useRef } from "react";
// import MedicalSymbol from "./MedicalSymbol";
import { Phone, Mail, MapPin, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PrescriptionDetails = () => {
  const prescriptionRef = useRef(null);
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: "Your prescription is being prepared for download.",
    });

    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Prescription has been downloaded successfully.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-600 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Dr. Doctor Name</h1>
            <p className="text-gray-500 tracking-wider">QUALIFICATION</p>
            <p className="text-gray-400 text-sm mt-6">Certification 12345-20</p>
          </div>
          {/* <MedicalSymbol className="text-blue-500 w-16 h-16" /> */}
        </div>

        {/* Prescription Content */}
        <div ref={prescriptionRef}>
          {/* Patient Information */}
          <div className="px-8 py-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Patient Name:</label>
              <div className="mt-1 border-b border-gray-300 pb-1"></div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address:</label>
              <div className="mt-1 border-b border-gray-300 pb-1"></div>
            </div>

            <div className="flex gap-6 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Age:</label>
                <div className="mt-1 border-b border-gray-300 pb-1"></div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Date:</label>
                <div className="mt-1 border-b border-gray-300 pb-1"></div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Diagnosis:</label>
              <div className="mt-1 border-b border-gray-300 pb-1"></div>
            </div>
          </div>

          {/* Prescription Symbol */}
          <div className="px-8 py-2">
            <div className="text-5xl font-bold text-blue-500">R<sub>x</sub></div>
          </div>

          {/* Prescription Area - Watermark */}
          <div className="px-8 py-4 relative min-h-[240px]">
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <MedicalSymbol className="text-blue-500 w-48 h-48" />
            </div> */}
            <div className="absolute bottom-4 right-8">
              <div className="border-t border-gray-300 pt-1 w-48 text-right">
                <p className="text-gray-700 text-sm">SIGNATURE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="px-8 py-4 flex justify-end">
          <Button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Prescription
          </Button>
        </div>

        {/* Footer */}
        <div className="bg-blue-100 rounded-b-lg px-8 py-4 flex items-center">
          <div className="flex-1">
            <h3 className="text-blue-600 font-bold">HOSPITAL</h3>
            <p className="text-gray-500 text-xs">SLOGAN HERE</p>
          </div>
          <div className="border-l-2 border-blue-400 h-12 mx-4"></div>
          <div className="flex-1">
            <div className="flex items-center text-gray-600 mb-1">
              <Phone size={14} className="mr-2 text-blue-500" />
              <span className="text-xs">55 47 79 94 15</span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <Phone size={14} className="mr-2 text-blue-500" />
              <span className="text-xs">55 47 79 94 15</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center text-gray-600 mb-1">
              <Mail size={14} className="mr-2 text-blue-500" />
              <span className="text-xs">email_here@email.com</span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin size={14} className="mr-2 text-blue-500" />
              <span className="text-xs">Address Here Number 123</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe size={14} className="mr-2 text-blue-500" />
              <span className="text-xs">www.webpage.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
