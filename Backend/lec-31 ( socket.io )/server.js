import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("New connection created")

    socket.on("message", (data) => {
        console.log("user sent/fired a message: ", data)

        io.emit("abc_msg", data)

    })


});

httpServer.listen(3000, () => {
    console.log("Server started on port 3000");
});