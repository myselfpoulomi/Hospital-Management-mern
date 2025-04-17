import AdminModel from "../modules/AdminSchema.js";

// GET all admins
 const getAllAdmin = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

// GET admin by ID
 const getAdminbyId = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

// POST add new admin
 const addAdmin = async (req, res) => {
  try {
    const { username, email, password, access } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin with this email already exists" });
    }

    const newAdmin = new AdminModel({
      username,
      email,
      password,
      access,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error adding admin", error });
  }
};

// POST login
 const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        access: admin.access,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

export {getAllAdmin,getAdminbyId,addAdmin,loginAdmin}
