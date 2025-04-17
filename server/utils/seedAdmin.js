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

        const existing = await AdminModel.findOne({ username: "rec" });
        if (existing) {
            console.log("Admin already exists");
            return process.exit(0);
        }

        const admin = new AdminModel({
            username: "rec",
            email: "receptionist@gmail.com",
            password: "111",
            access: {
                dashboard: false,
                prescription: true,
                doctordetails: true,
                medicinemanagement: false,
                staffdetails: false,
                patientdetails: true,
                financial: false,
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