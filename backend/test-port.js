const express = require("express");
const app = express();
const PORT = 4001;

console.log("Starting server...");

app.get("/test", (req, res) => {
  console.log("Request received!");
  res.json({ message: "Server is working" });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});
