import express from 'express'
const router = express.Router();
import {getAllPatients,getPatientById,addPatient,updatePatient,deletePatient} from '../controlers/PatientControler.js'

// Define routes
router.get("/", getAllPatients);
router.get("/:id",getPatientById);
router.post("/addPatient",addPatient);
router.put("/updatePatient/:id",updatePatient);
router.delete("/deletePatient/:id",deletePatient);

export default router