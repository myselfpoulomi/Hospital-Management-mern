import React from "react";

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const PatientDetails = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium text-gray-700">Name:</p>
          <p>{patient.firstName} {patient.lastName}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Gender:</p>
          <p>{patient.gender}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Contact:</p>
          <p>{patient.contactNumber}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Email:</p>
          <p>{patient.email || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Date of Birth:</p>
          <p>{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Age:</p>
          <p>{calculateAge(patient.dateOfBirth)}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Blood Type:</p>
          <p>{patient.bloodType || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Address:</p>
          <p>{patient.address || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Allergies:</p>
          <p>{patient.allergies || "None"}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Medical History:</p>
          <p>{patient.medicalHistory || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
