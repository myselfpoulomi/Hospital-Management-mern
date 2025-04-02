import express from 'express'
const router = express.Router();
import {getAllDoctors,getDoctorById,addDoctor,updateDoctor,deleteDoctor} from '../controlers/DoctorControler.js'

// Define routes
router.get("/", getAllDoctors);
router.get("/:id",getDoctorById);
router.post("/addDoc",addDoctor);
router.put("/:id",updateDoctor);
router.delete("/:id",deleteDoctor);

export default router
