import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const PrescriptionDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [prescription, setPrescription] = useState(null);
  const [age, setAge] = useState(null);

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
  }, [id]);

  const currentDate = new Date().toLocaleDateString();
  const doctor = prescription?.assignedDoctor;

  if (!prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-700 text-white">
        <p className="text-lg">Loading prescription...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-blue-100 min-h-[1000px] flex flex-col justify-between">
        {/* Header */}
        <div className="px-8 py-6 border-b border-blue-100 bg-blue-100 rounded-t-xl">
          <h1 className="text-3xl font-bold text-blue-700">
            {doctor?.full_name || "Dr. Name"}
          </h1>
          <p className="text-blue-600 text-sm">{doctor?.degree}</p>
          <p className="text-blue-500 text-sm mt-1 italic">
            Specialization: {doctor?.specialization || "N/A"}
          </p>
        </div>

        {/* Patient Info */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium border-b pb-1">{prescription.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium border-b pb-1">{prescription.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium border-b pb-1">{age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium border-b pb-1">{currentDate}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
            <p className="border-b pb-1 font-medium">{prescription.diagnosis || "N/A"}</p>
          </div>
        </div>

        {/* Writing Area */}
        <div className="px-8 flex-grow">
          <div className="min-h-[500px] border border-dashed border-blue-200 rounded-lg p-6 bg-white text-gray-400 italic">
            Write Here....
          </div>
        </div>

        {/* Signature + Download */}
        <div className="px-8 py-6 flex justify-between items-end mt-7">
          <div>
            <div className="border-t border-gray-400 w-48 pt-1">
              <p className="mt-8text-sm text-gray-600">{doctor?.full_name || "Doctor Signature"}</p>
            </div>
          </div>
          <Button
            onClick={() =>
              toast({
                title: "Download initiated",
                description: "Preparing prescription...",
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Footer */}
        <div className="bg-blue-100 rounded-b-xl px-8 py-4 text-sm text-blue-700 flex justify-between">
          <div>
            <h3 className="font-semibold">Your Hospital Name</h3>
            <p className="text-xs text-blue-600">Care. Compassion. Commitment.</p>
          </div>
          <div className="text-right text-xs space-y-1 text-blue-600">
            <p><Phone className="inline w-3 h-3 mr-1" /> 55 47 79 94 15</p>
            <p><Mail className="inline w-3 h-3 mr-1" /> email@hospital.com</p>
            <p><MapPin className="inline w-3 h-3 mr-1" /> Address Line</p>
            <p><Globe className="inline w-3 h-3 mr-1" /> www.hospital.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
