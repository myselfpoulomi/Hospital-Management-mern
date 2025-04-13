// controllers/PrescriptionController.js
import Prescription from '../modules/PresciptionSchema.js';

// Get all prescriptions
// controllers/PrescriptionController.js
const getAllPresciption = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('assignedDoctor')
      .populate('patientName');  // Add this line
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescriptions", error });
  }
};


// Get a prescription by ID
const getPresciptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('assignedDoctor', 'full_name specialization')
      .populate('patientName', 'full_name');

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving prescription", error });
  }
};

// Add a new prescription
const addPresciption = async (req, res) => {
  const { patientName, dob, address, price, assignedDoctor } = req.body;

  try {
    const newPrescription = new Prescription({
      patientName,
      dob,
      address,
      price,
      assignedDoctor
    });

    await newPrescription.save();

    // Populate after save for consistent response
    const populated = await Prescription.findById(newPrescription._id)
      .populate('assignedDoctor', 'full_name specialization')
      .populate('patientName', 'full_name');

    res.status(201).json({
      message: "Prescription added successfully",
      prescription: populated
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add prescription", error });
  }
};

// Update a prescription
const updatePresciption = async (req, res) => {
  const { id } = req.params;
  const { patientName, dob, address, price, assignedDoctor } = req.body;

  try {
    const updated = await Prescription.findByIdAndUpdate(
      id,
      { patientName, dob, address, price, assignedDoctor },
      { new: true, runValidators: true }
    )
      .populate('assignedDoctor', 'full_name specialization')
      .populate('patientName', 'full_name');

    if (!updated) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
      message: "Prescription updated successfully",
      prescription: updated
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update prescription", error });
  }
};

// Delete a prescription
const deletePresciption = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Prescription.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete prescription", error });
  }
};

export {
  getAllPresciption,
  getPresciptionById,
  addPresciption,
  updatePresciption,
  deletePresciption
};
