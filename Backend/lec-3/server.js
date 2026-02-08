const express = require("express");
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
    const note = req.body;
    notes.push(note);
    console.log(note);
    res.send("Note added successfully");
})

app.get("/notes", (req, res) => {
    res.send(notes);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
