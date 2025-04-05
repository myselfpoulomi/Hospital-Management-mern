// models/medicine.js or models/medicine.ts if using TypeScript

import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  medicineId: {
    type: String,
    required: true,
    unique: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Analgesics', 'Antibiotics', 'Antihypertensives', 'Antivirals', 'Vaccines' ,'Other'], // Customize
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'], // Customize
  },
  expiryDate: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

// Prevent model overwrite issue in dev (important in Next.js)
 const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);

 export default Medicine;
