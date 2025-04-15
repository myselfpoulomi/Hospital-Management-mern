import express from 'express'
const router = express.Router();
import {getAllStaff,getStaffbyId,addStaff,updateStaff,deleteStaff} from '../controlers/StaffControler.js'


// Define routes
router.get("/", getAllStaff);
router.get("/:id",getStaffbyId);
router.post("/addStaff",addStaff);
router.put("/updateStaff/:id",updateStaff);
router.delete("/deleteStaff/:id",deleteStaff);

export default router