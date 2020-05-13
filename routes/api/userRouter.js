"use strict";

const express = require("express");
const router = express.Router();
// User model
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../../validation/validation");

router.post("/register", async (req, res, next) => {
    // Validation
    try {
        const { error } = await registerValidation(req.body);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });   
        }
    } catch (err) {
        console.error(err);
    }

    // Check if user is in the db
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({
            message: "Email already exists."
        });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();

        res.status(201).json({
            message: "New user registered",
            user: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: err
        });

        next(err);
    }
});

router.post("/login", async (req, res) => {
    res.send("Logging user in...");
});

module.exports = router;