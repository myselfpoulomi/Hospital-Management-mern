import DoctorModel from '../modules/DoctorSchema.js'

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findOne({ doctor_id: req.params.id });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new doctor
const addDoctor = async (req, res) => {
    console.log(req.body);
    
    const doctor = new DoctorModel({
        doctor_id: req.body.doctor_id,
        full_name: req.body.full_name,
        degree: req.body.degree,
        specialization: req.body.specialization,
        patient_count: req.body.patient_count || 0
    });

    try {
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a doctor
const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await DoctorModel.findOneAndUpdate(
            { doctor_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await DoctorModel.findOneAndDelete({ doctor_id: req.params.id });
        if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export  {getAllDoctors,getDoctorById,addDoctor,updateDoctor,deleteDoctor}


