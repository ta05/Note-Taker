// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

app.get("/api/notes", function (req, res) {
    const notes = []
    const data = fs.readFileSync(path.join(__dirname, "db", "db.json"));
    JSON.parse(data).forEach(note => {
        notes.push(note);
    });
    res.json(notes);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname,"public", "index.html"))
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});