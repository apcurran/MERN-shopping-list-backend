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
        await registerValidation(req.body);
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    // Check if user is in the db
    try {
        const emailExists = await User.findOne({ email: req.body.email });
    
        if (emailExists) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }
    } catch (err) {
        console.error(err);
    }

    
    try {
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

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

router.post("/login", async (req, res, next) => {
    // Validation
    try {
        await loginValidation(req.body);
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    // Check if email exists
    try {
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) {
            return res.status(400).json({
                message: "Email is not found"
            });
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Logged in!"
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: err
        });

        next(err);
    }

});

module.exports = router;