const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
});


// =========================
// GET ONE PRODUCT
// =========================

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });
    }
});


// =========================
// CREATE PRODUCT
// =========================

router.post("/", async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            category,
            image
        } = req.body;

        if (!name || !description || price === undefined || !category || !image) {
            return res.status(400).json({
                message: "All product fields are required"
            });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            image
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
});


// =========================
// DELETE PRODUCT
// =========================

router.delete("/:id", async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
});


module.exports = router;