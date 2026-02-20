const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

/*
    POST /notes
    req.body => {title, content}
*/
app.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    const note = await noteModel.create({
        title,
        content,
    });
    res.status(201).json({
        message: "Note created successfully",
        note,
    });
});

/*
    GET /notes
*/
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        notes,
    });
});

/*
    DELETE /notes/:id
    delete note with the from req.params.id
*/
app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const note = await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Note deleted successfully",
        note,
    });
});

/*
    PATCH /notes/:id
    update content of the note
    update note with the from req.params.id
*/
app.patch("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, {
        content,
    });
    res.status(200).json({
        message: "Note updated successfully",
        note,
    });
});

module.exports = app;
