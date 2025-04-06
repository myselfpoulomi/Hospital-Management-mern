import express from 'express'
const router = express.Router();
import {getAllPresciption,getPresciptionById,addPresciption,updatePresciption,deletePresciption} from '../controlers/PrescriptionControler.js'


// Define routes
router.get("/", getAllPresciption);
router.get("/:id",getPresciptionById);
router.post("/addPresciption",addPresciption);
router.put("/updatePresciption/:id",updatePresciption);
router.delete("/deletePresciption/:id",deletePresciption);

export default router