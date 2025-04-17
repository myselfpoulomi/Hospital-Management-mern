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
  // access: {
  //   medicine: { type: Boolean, default: false },
  //   bedStatus: { type: Boolean, default: false },
  //   prescription: { type: Boolean, default: false },
  //   financial: { type: Boolean, default: false },
  //   doctors: { type: Boolean, default: false },
  //   patients: { type: Boolean, default: false },
  // },
}, {
  timestamps: true,
});

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel
