"use strict";

const express = require("express");
const router = express.Router();
// Item Model
const Item = require("../../models/Item");

// route: GET api/items
// desc: Get all items
// access: Public
router.get("/", async (req, res, next) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({
            error: err
        });

        next(err);
    }
});

// route: POST api/items
// desc: Create an item
// access: Public
router.post("/", async (req, res, next) => {
    try {
        const newItem = new Item({
            name: req.body.name
        });
        const savedItem = await newItem.save();

        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({
            error: err
        });

        next(err);
    }
});

// route: DELETE api/items/:id
// desc: Delete an item
// access: Public
router.delete("/:id", async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        const removedItem = await item.remove();

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(404).json({
            error: err
        });

        next(err);
    }
});

module.exports = router;