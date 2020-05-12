"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 250
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 250
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1000
    }
});

module.exports = mongoose.model("User", UserSchema);