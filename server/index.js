import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("API called");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});
