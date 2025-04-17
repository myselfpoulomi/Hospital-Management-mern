// seedAdmin.js
import mongoose from "mongoose";
import AdminModel from "../modules/AdminSchema.js";

const seedAdmin = async () => {
    try {
        await mongoose.connect("mongodb+srv://poulomirouth2003:poulomi2003@hospitalmanagement.uvluxjx.mongodb.net/?retryWrites=true&w=majority&appName=hospitalmanagement", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const existing = await AdminModel.findOne({ username: "admin" });
        if (existing) {
            console.log("Admin already exists");
            return process.exit(0);
        }

        const admin = new AdminModel({
            username: "admin",
            email: "admin@gmail.com",
            password: "qqq", // 🔥 Plain text for seeding only!
            access: {
                dashboard: true,
                prescription: true,
                doctordetails: true,
                medicinemanagement: true,
                staffdetails: true,
                patientdetails: true,
                financial: true,
            },
        });

        await admin.save();
        console.log("Admin user created");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin();