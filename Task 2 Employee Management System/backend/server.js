const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Employee Management System API is running"
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT || 5000}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });