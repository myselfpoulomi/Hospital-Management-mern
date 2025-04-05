import express from 'express'
const router = express.Router();
import {getAllMedicine,getMedicinebyID,addMedicine,updateMedicine,deleteMedicine} from '../controlers/MedicineControler.js'

// Define routes
router.get("/", getAllMedicine);
router.get("/:id",getMedicinebyID);
router.post("/addMedicine",addMedicine);
router.put("/updateMedicine/:id",updateMedicine);
router.delete("/deleteMedicine/:id",deleteMedicine);

export default router