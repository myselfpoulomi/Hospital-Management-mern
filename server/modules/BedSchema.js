import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    trim: true,
  },
  bedType: {
    type: String,
    required: true,
    enum: ['ICU', 'General'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Occupied'],
    default: 'Available',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: function () {
      return this.status === 'Occupied';
    },
  },
  admissionDate: {
    type: Date,
    required: function () {
      return this.status === 'Occupied';
    },
  },
}, {
  timestamps: true,
});

const Bed = mongoose.model('Bed', bedSchema);
export default Bed;
