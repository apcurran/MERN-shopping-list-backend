"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

// Setup Routes
const items = require("./routes/api/itemsRouter");

mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// Setup body-parser
app.use(express.json());

// Use Routes
app.use("/api/items", items);

app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));