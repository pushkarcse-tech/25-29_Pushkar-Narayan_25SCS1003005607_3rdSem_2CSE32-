const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
    {
        name: "Wireless Headphones",
        description: "Comfortable wireless headphones with clear sound and long battery life.",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        name: "Smart Watch",
        description: "Modern smartwatch with fitness tracking and everyday health features.",
        price: 2499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes designed for comfort and daily workouts.",
        price: 1799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        name: "Backpack",
        description: "Spacious everyday backpack suitable for college, travel and work.",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
        name: "Sunglasses",
        description: "Stylish sunglasses with a classic design for everyday use.",
        price: 899,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        name: "Coffee Mug",
        description: "Minimal ceramic coffee mug perfect for home or office.",
        price: 499,
        category: "Home",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d"
    }
];

async function seedProducts() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log("Products added successfully");

        await mongoose.connection.close();

    } catch (error) {

        console.error("Error:", error.message);

    }
}

seedProducts();