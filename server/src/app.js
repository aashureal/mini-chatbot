const express = require("express");
const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer, {
  // ...options...
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    // io.emit("chat message", msg);

    console.log("message: " + msg);
  });
});

module.exports = { app, httpServer };
