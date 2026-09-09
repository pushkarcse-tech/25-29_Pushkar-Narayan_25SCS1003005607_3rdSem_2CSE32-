const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Message", messageSchema);