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
    // pages[req.params.index] = null;


    res.send("pages deleted successfully")
})
    
module.exports = app;