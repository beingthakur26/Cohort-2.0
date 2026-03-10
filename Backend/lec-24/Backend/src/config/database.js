const mongoose = require('mongoose')

const connectDB = async () => {
    return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err)
    })
}

module.exports = connectDB