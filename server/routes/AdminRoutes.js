import express from "express";
import {
  getAllAdmin,
  getAdminbyId,
  addAdmin,
  loginAdmin,
} from "../controlers/AdminControler.js"

const router = express.Router();

router.get("/", getAllAdmin);
router.get("/:id", getAdminbyId);
router.post("/addAdmin", addAdmin);
router.post("/login", loginAdmin);

export default router;
