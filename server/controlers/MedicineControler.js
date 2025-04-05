import Medicine from "../modules/MedicineSchema.js";

// GET all medicines
const getAllMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines." });
  }
};

// GET medicine by ID
const getMedicinebyID = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medicine." });
  }
};

// POST new medicine
const addMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ error: "Failed to add medicine.", details: error.message });
  }
};

// PUT update medicine
 const updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ error: "Failed to update medicine.", details: error.message });
  }
};

// DELETE medicine
 const deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) {
      return res.status(404).json({ error: "Medicine not found." });
    }
    res.status(200).json({ message: "Medicine deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete medicine." });
  }
};

export {getAllMedicine,getMedicinebyID,addMedicine,updateMedicine,deleteMedicine}