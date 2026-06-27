import express from "express";

const app = express();

app.get("/hii", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;