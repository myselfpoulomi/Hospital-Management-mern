import express from 'express'
const router = express.Router();
import {getAllDoctors,getDoctorById,addDoctor,updateDoctor,deleteDoctor,patientCount} from '../controlers/DoctorControler.js'

// Define routes
router.get("/", getAllDoctors);
router.get("/:id",getDoctorById);
router.post("/addDoc",addDoctor);
router.put("/updateDoctor/:id",updateDoctor);
router.delete("/deleteDoctor/:id",deleteDoctor);
router.get("/getPatientCount/:id",patientCount);

export default router
