const mongoose = require("mongoose");
// require("dotenv").config();

ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.log("MongoDB connection failed", error);
        })
}

module.exports = ConnectDB;