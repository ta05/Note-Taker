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
app.use(express.static(path.join(__dirname, 'public')));

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

app.post("/api/notes", function (req, res) {
    const newNotes = req.body;

    console.log(newNotes);

    notes = JSON.parse(fs.readFileSync(path.join(__dirname, "db", "db.json")));
    notes.push(newNotes)
    fs.writeFileSync(path.join(__dirname, "db", "db.json"), JSON.stringify(notes));

    res.json(newNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});