import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrescriptionDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [prescription, setPrescription] = useState(null);
  const [age, setAge] = useState(null);
  const printRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/Prescription/${id}`);
        const data = res.data;
        setPrescription(data);

        if (data.dob) {
          const birthDate = new Date(data.dob);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
          }
          setAge(calculatedAge);
        }
      } catch (err) {
        console.error("Error:", err);
        toast({
          title: "Error",
          description: "Could not load prescription.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [id, toast]);

  const currentDate = new Date().toLocaleDateString();
  const doctor = prescription?.assignedDoctor;

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("prescription.pdf");
  };

  if (!prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-700 text-white">
        <p className="text-lg">Loading prescription...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-blue-50 flex flex-col items-center justify-center p-6 min-h-screen">
      <div
        ref={printRef}
        className="bg-white rounded-xl shadow-lg border border-blue-100 flex flex-col justify-between overflow-hidden"
        style={{ width: "794px", height: "1123px" }}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-blue-100 bg-blue-100 rounded-t-xl flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              {doctor?.full_name || "Dr. Name"}
            </h1>
            <p className="text-blue-600 text-sm">
              {doctor?.degree || "MBBS, MD"}
            </p>
            <p className="text-blue-500 text-sm mt-1 italic">
              Specialization: {doctor?.specialization || "General Medicine"}
            </p>
          </div>

          {/* Hospital Name at Top-Right */}
          <div className="text-right">
            <h2 className="font-bold text-4xl  text-blue-600">Health Hub</h2>
            <p className="text-sm text-blue-600">
              Care. Compassion. Commitment.
            </p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium border-b pb-1">
                {prescription.patientName?.firstName ||
                prescription.patientName?.lastName
                  ? `${prescription.patientName?.firstName || ""} ${
                      prescription.patientName?.lastName || ""
                    }`.trim()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium border-b pb-1">
                {prescription.address || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium border-b pb-1">{age || "N/A"} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium border-b pb-1">{currentDate}</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-5">Diagnosis</p>
            <p className="border-b pb-1 font-medium">
              {/* Optional: Add prescription.diagnosis here if available */}
            </p>
          </div>
        </div>

        {/* Writing Area */}
        <div className="px-8 flex-grow">
          <div className="min-h-[500px] border border-dashed border-blue-200 rounded-lg p-6 bg-white text-gray-400 italic">
            Write Here...
          </div>
        </div>

        {/* Signature */}
        <div className="px-8 py-6 flex justify-start items-end mt-7">
          <div>
            <div className="border-t border-gray-400 w-48 pt-1">
              <p className="mt-2 text-sm text-gray-600">
                {doctor?.full_name || "Doctor Signature"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-100 rounded-b-xl px-8 py-4 text-sm text-blue-700 flex justify-between">
          <div>
            <h3 className="font-bold text-3xl">Health Hub</h3>
            <p className="text-sm text-blue-600">
              Care. Compassion. Commitment.
            </p>
          </div>
          <div className="text-right text-xs space-y-1 text-blue-600">
            <p>
              <Phone className="inline w-3 h-3 mr-1" /> 101010101
            </p>
            <p>
              <Mail className="inline w-3 h-3 mr-1" /> healthhub@hospital.com
            </p>
            <p>
              <MapPin className="inline w-3 h-3 mr-1" /> Durgapur,West Bengal 
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleDownloadPdf}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
