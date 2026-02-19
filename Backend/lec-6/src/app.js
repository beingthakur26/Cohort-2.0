const express = require("express");
const app = express();

const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb://manas:jt8WgslvY1P0cgkl@ac-4mscc07-shard-00-00.lczyxx7.mongodb.net:27017,ac-4mscc07-shard-00-01.lczyxx7.mongodb.net:27017,ac-4mscc07-shard-00-02.lczyxx7.mongodb.net:27017/?replicaSet=atlas-ahhvr9-shard-0&ssl=true&authSource=admin"
    );
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}


dbConnect();


module.exports = app;