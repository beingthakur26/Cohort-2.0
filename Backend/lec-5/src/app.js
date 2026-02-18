const express = require("express");

const app = express();

app.use(express.json());

// In-memory storage
const notes = [];

// POST /notes
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note added successfully",
    // data: req.body
  });
});

// GET /notes
app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    });
});

// DELETE /notes/:index
app.delete("/notes/:id", (req, res) => {
    const index = req.params.id;
    notes.splice(index, 1);
    // delete notes[req.params.id];
    res.status(204).json({
        message: "Note deleted successfully"
    });
});

// PATCH /notes/:index
app.patch("/notes/:id", (req, res) => {
    notes [req.params.id].name = req.body.name;
    // notes [req.params.id].description = req.body.description;
    res.status(200).json({
        message: "Note updated successfully"
    });
});

module.exports = app;
