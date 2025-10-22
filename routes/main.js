// Create a new router
const express = require("express");
const router = express.Router();

// Handle the main routes

// Home route
router.get("/", (req, res) => res.send ("This is the home page."));
// About route
router.get("/about", (req, res) => res.send ('<h1>This is the about page</h1>'));
// Contact route
router.get("/contact", (req, res) => res.send ('<h1>This is the contact page. My github is <a href="https://github.com/NotShaky/">NotShaky</a></h1>'));
// Date route
router.get("/date", (req, res) => {
    const now = new Date();
    // return both human-friendly and ISO formats
    res.type('html'); // explicit content-type
    res.send("<h1>This is the current date: " + now.toString() + "</h1><pre>" + now.toISOString() + "</pre>");
});
// Welcome route with parameter
router.get("/welcome/:name", (req, res) => {
    const name = req.params.name;
    res.send("<h1>Welcome, " + name + "!</h1><p>We're glad to have you here.</p>");
});
// Chained handlers route
router.get("/chain", (req, res, next) => {
    console.log("First handler");
    next();
}, (req, res) => {
    res.send("<h1>Second handler reached!</h1>");
});
// File download route
router.get("/file", (req, res) => {
    res.download(__dirname + "/sample.txt", "downloaded-file.txt"); // Forces download with custom filename
});

// Export the router object so index.js can access it
module.exports = router;
