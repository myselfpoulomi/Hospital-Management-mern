import express from 'express'
const router = express.Router();
import {getAllPatients,getPatientById,addPatient,updatePatient,deletePatient} from '../controlers/PatientControler.js'

// Define routes
router.get("/", getAllPatients);
router.get("/:id",getPatientById);
router.post("/addPatient",addPatient);
router.put("/:id",updatePatient);
router.delete("/:id",deletePatient);

export default router