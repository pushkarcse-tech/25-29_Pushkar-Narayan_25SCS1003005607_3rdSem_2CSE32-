const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const Message = require("./models/Message");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();
const server = http.createServer(app);


// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// SOCKET.IO
// =========================

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        message: "Real-Time Chat Application API is running"
    });
});
// =========================
// AUTH ROUTES
// =========================

app.use("/api/auth", authRoutes);


// =========================
// SOCKET CONNECTION
// =========================

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);


    // =========================
    // JOIN ROOM
    // =========================

    socket.on("join-room", async (room) => {

        socket.join(room);

        console.log(
            `User ${socket.id} joined room: ${room}`
        );


        // Get previous messages

        try {

            const messages = await Message.find({
                room: room
            })
            .sort({ createdAt: 1 })
            .limit(100);


            socket.emit(
                "message-history",
                messages
            );

        } catch (error) {

            console.log(
                "Failed to load message history:",
                error.message
            );

        }
    });


    // =========================
    // SEND MESSAGE
    // =========================

    socket.on("send-message", async (data) => {

        try {

            const newMessage = new Message({

                room: data.room,

                username: data.username,

                message: data.message,

                time: new Date().toLocaleTimeString()

            });


            const savedMessage =
                await newMessage.save();


            // Send message to everyone
            // in the same room

            io.to(data.room).emit(
                "receive-message",
                savedMessage
            );


        } catch (error) {

            console.log(
                "Failed to save message:",
                error.message
            );

        }
    });


    // =========================
    // DISCONNECT
    // =========================

    socket.on("disconnect", () => {

        console.log(
            "User disconnected:",
            socket.id
        );

    });

});


// =========================
// MONGODB CONNECTION
// =========================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );


        // =========================
        // START SERVER
        // =========================

        server.listen(5002, () => {

            console.log(
                "Server running on http://localhost:5002"
            );

        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });