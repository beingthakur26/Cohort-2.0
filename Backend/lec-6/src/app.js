const express = require("express");
const app = express();

const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb://manas:l0WenYkSywhQ84v9@ac-glvn5tg-shard-00-00.sppz2qu.mongodb.net:27017,ac-glvn5tg-shard-00-01.sppz2qu.mongodb.net:27017,ac-glvn5tg-shard-00-02.sppz2qu.mongodb.net:27017/day-6?replicaSet=atlas-hdkizj-shard-0&ssl=true&authSource=admin"
    );
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}


dbConnect();


module.exports = app;