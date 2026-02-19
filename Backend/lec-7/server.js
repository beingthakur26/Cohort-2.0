const app = require("./src/app");
const ConnectDB = require("./src/config/database.js");
require("dotenv").config();

ConnectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});