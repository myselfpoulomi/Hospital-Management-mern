import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import DoctorRoutes from './routes/DoctorRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';
import MedicineRoutes from './routes/MedicineRoutes.js'

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific options (optional)
app.use(cors({
  origin: "http://localhost:5173", // Update for production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Define routes
app.use("/Doctors", DoctorRoutes);
app.use("/Patients", PatientRoutes);
app.use("/Medicine", MedicineRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
