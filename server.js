"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const PORT = process.env.PORT || 5000;
const app = express();

// Setup Routes
const userRoute = require("./routes/api/userRouter");
const itemRoute = require("./routes/api/itemsRouter");

mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// Setup body-parser
app.use(express.json());
app.use(compression()); // Compress all routes

// Routes Middleware
app.use("/api/user/items", itemRoute);
app.use("/api/user", userRoute);

// Handle production assets
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(__dirname + "/public/"));
    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });
}

app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));