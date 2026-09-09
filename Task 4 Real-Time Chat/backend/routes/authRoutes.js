const express = require("express");
const User = require("../models/User");

const router = express.Router();


// =========================
// REGISTER USER
// =========================

router.post("/register", async (req, res) => {
    try {

        const {
            username,
            email,
            password
        } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const existingUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });


        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }


        const user = new User({
            username,
            email,
            password
        });


        await user.save();


        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }
});


// =========================
// LOGIN USER
// =========================

router.post("/login", async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        const user = await User.findOne({ email });


        if (!user || user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }
});


module.exports = router;