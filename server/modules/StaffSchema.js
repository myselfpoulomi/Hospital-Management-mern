// models/staffModel.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  contact_number: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  staff_type: {
    type: String,
    enum: ["nurse", "admin", "doctor", "technician"], // <-- Add missing types
    required: true,
  },
}, { timestamps: true });


export default mongoose.model("Staff", staffSchema);
