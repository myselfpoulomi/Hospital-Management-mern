import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  // Doctor selected via dropdown on frontend
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;
