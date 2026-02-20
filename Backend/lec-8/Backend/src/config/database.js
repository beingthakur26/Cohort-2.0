const mongoose = require("mongoose");

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