import Bed from "../modules/BedSchema.js";
import Patient from "../modules/PatientSchema.js";

// Create a new bed
export const createBed = async (req, res) => {
  try {
    const bed = new Bed(req.body);
    await bed.save();
    res.status(201).json(bed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all beds (with optional patient details)
export const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find().populate("patient", "firstName lastName");
    res.json(beds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bed by ID
export const getBedById = async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id).populate("patient", "firstName lastName");
    if (!bed) return res.status(404).json({ error: "Bed not found" });
    res.json(bed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bed
export const updateBed = async (req, res) => {
  try {
    const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bed) return res.status(404).json({ error: "Bed not found" });
    res.json(bed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bed
export const deleteBed = async (req, res) => {
  try {
    const bed = await Bed.findByIdAndDelete(req.params.id);
    if (!bed) return res.status(404).json({ error: "Bed not found" });
    res.json({ message: "Bed deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
