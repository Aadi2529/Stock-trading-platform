require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3002;

app.get("/test", (req, res) => {
  res.json({ message: "Server is working" });
});

app.listen(PORT, () => {
  console.log(`✅ Minimal server started on port ${PORT}`);
});

// Global error handler
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error(err.stack);
});
