const express = require("express");
const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const { generateAIResponse } = require("../services/ai.services");
const io = new Server(httpServer, {
  // ...options...
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai message", async (msg) => {
    const aiResponse = await generateAIResponse(msg);
    // console.log("AI Response:", aiResponse);

    socket.emit("ai message res", aiResponse);
  });
});

module.exports = { app, httpServer };
