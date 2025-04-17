// models/Admin.js
import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  access: {
    dashboard: { type: Boolean, default: false },
    prescription: { type: Boolean, default: false },
    doctordetails: { type: Boolean, default: false },
    medicinemanagement: { type: Boolean, default: false },
    staffdetails: { type: Boolean, default: false },
    patientdetails: { type: Boolean, default: false },
    financial: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel
