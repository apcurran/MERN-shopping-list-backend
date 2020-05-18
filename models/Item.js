"use strict";

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    // Associate the item with the specified user
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Item", ItemSchema);