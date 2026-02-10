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
    console.log(page);

    res.json({ message: "Page added successfully" });
});

app.get("/pages", (req, res) => {
    res.json(pages);
});

app.delete("/pages", () => {
    
})
    
module.exports = app;