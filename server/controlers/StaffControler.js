import Staff from "../modules/StaffSchema.js";

// GET all staff
 const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff", error });
  }
};

// GET staff by ID
 const getStaffbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff", error });
  }
};

// POST add new staff
 const addStaff = async (req, res) => {
  const { full_name, gender, age, contact_number, staff_type } = req.body;

  if (!full_name || !gender || !age || !contact_number || !staff_type) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newStaff = new Staff({ full_name, gender, age, contact_number, staff_type });
    await newStaff.save();
    res.status(201).json({ message: "Staff added successfully", staff: newStaff });
  } catch (error) {
    res.status(500).json({ message: "Error adding staff", error });
  }
};

// PUT update staff
 const updateStaff = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ message: "Staff updated", staff: updatedStaff });
  } catch (error) {
    res.status(500).json({ message: "Error updating staff", error });
  }
};

// DELETE staff
 const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Staff.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff", error });
  }
};

export {getAllStaff,getStaffbyId,addStaff,updateStaff,deleteStaff}
