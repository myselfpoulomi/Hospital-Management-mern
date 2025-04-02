import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  doctor_id: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  degree: { type: String, required: true },
  specialization: { type: String, required: true },
  patient_count: { type: Number, default: 0 }
});

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;