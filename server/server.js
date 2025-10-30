require("dotenv").config();

const { generateAIResponse } = require("./services/ai.services");
const { httpServer, app } = require("./src/app");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
