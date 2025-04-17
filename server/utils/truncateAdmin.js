// truncateAdmin.js
import mongoose from "mongoose";
import AdminModel from "../modules/AdminSchema.js";
const truncateAdmin = async () => {
    try {
        await mongoose.connect("mongodb+srv://poulomirouth2003:poulomi2003@hospitalmanagement.uvluxjx.mongodb.net/?retryWrites=true&w=majority&appName=hospitalmanagement", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const result = await AdminModel.deleteMany({});
        console.log(`Truncated Admin collection. Deleted ${result.deletedCount} document(s).`);

        process.exit(0);
    } catch (err) {
        console.error("Error truncating admin collection:", err);
        process.exit(1);
    }
};

truncateAdmin();