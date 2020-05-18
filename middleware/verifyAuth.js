"use strict";

const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Access denied"
        });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({
            error: "Invalid token"
        });
    }
}