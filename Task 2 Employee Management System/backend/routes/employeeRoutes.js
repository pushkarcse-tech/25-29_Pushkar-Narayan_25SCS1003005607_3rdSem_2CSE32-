const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();


// =========================
// GET ALL EMPLOYEES
// =========================

router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        res.json(employees);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    }
});


// =========================
// GET ONE EMPLOYEE
// =========================

router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json(employee);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employee",
            error: error.message
        });
    }
});


// =========================
// CREATE EMPLOYEE
// =========================

router.post("/", async (req, res) => {
    try {

        const {
            name,
            email,
            position,
            department
        } = req.body;


        // Basic validation

        if (!name || !email || !position || !department) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check duplicate email

        const existingEmployee =
            await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({
                message: "An employee with this email already exists"
            });
        }


        const employee = new Employee({
            name,
            email,
            position,
            department
        });


        const savedEmployee =
            await employee.save();


        res.status(201).json(savedEmployee);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    }
});


// =========================
// UPDATE EMPLOYEE
// =========================

router.put("/:id", async (req, res) => {
    try {

        const {
            name,
            email,
            position,
            department
        } = req.body;


        if (!name || !email || !position || !department) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const employee =
            await Employee.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    email,
                    position,
                    department
                },
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }


        res.json(employee);

    } catch (error) {

        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
});


// =========================
// DELETE EMPLOYEE
// =========================

router.delete("/:id", async (req, res) => {
    try {

        const employee =
            await Employee.findByIdAndDelete(
                req.params.id
            );


        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }


        res.json({
            message: "Employee deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
});


module.exports = router;