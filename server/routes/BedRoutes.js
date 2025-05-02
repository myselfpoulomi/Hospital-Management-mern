import express from "express";
import {
  createBed,
  getAllBeds,
  getBedById,
  updateBed,
  deleteBed,
} from "../controlers/BedControler.js";

const router = express.Router();

router.post("/createBed", createBed);
router.get("/", getAllBeds);
router.get("/:id", getBedById);
router.put("/updateBed/:id", updateBed);
router.delete("/deleteBed/:id", deleteBed);

export default router;