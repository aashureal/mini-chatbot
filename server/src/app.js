const express = require("express");
const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const { generateAIResponse } = require("../services/ai.services");
const io = new Server(httpServer, {
  // ...options...
});

const chatHistory = [
  {
    role: "user",
    parts: [{ text: "who was the PM  of india in 2010" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Ahoy there! In 2010, the Prime Minister of India was **Dr. Manmohan Singh**. He was steering the ship of state at that time.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "who was the Presedent of india in 2010" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Ahoy there! In 2010, the President of India was **Pratibha Patil**. She was the first woman to hold the office.",
      },
    ],
  },
];

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai message", async (msg) => {
    chatHistory.push({ role: "user", parts: [{ text: msg }] });
    // console.log("user message:", msg);

    const aiResponse = await generateAIResponse(chatHistory);
    // console.log("AI Response:", aiResponse);

    socket.emit("ai message res", aiResponse);
  });
});

module.exports = { app, httpServer };
