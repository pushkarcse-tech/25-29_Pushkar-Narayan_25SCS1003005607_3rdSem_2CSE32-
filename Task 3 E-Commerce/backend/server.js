const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const productRoutes = require("./routes/productRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Product API routes
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Local Store E-commerce API is running"
    });
});

// Port
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });