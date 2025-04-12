import express from 'express'
const router = express.Router();
import {getAllAdmin,getAdminbyId,addAdmin} from '../controlers/AdminControler.js'

// Define routes
router.get("/", getAllAdmin);
router.get("/:id",getAdminbyId);
router.post("/addAdmin",addAdmin);
// router.put("/:id",updateDoctor);
// router.delete("/:id",deleteDoctor);

export default router