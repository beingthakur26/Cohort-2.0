/**
    - server create krna 
    - server ko config krna
 */

const express = require("express");
const app = express();

app.use(express.json());

const pages = [];

app.post("/pages", (req, res) => {
    const page = req.body;
    pages.push(page);
    res.send("Page added successfully");
});

app.get("/pages", (req, res) => {
    res.send(pages);
});

app.delete("/pages/:index", (req, res) => {
    delete pages[req.params.index];
    res.send("pages deleted successfully")
})

app.patch("/pages/:index", (req, res) => {
    pages[ req.params.index ].content = req.body.content
    pages[ req.params.index ].title = req.body.title
    res.send("pages updated successfully")
})
    
module.exports = app;