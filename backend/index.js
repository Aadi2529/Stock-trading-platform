const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const tradeRoute = require("./Routes/TradeRoute");

const app = express();
const { MONGO_URL, PORT } = process.env;

/* =======================
   DATABASE CONNECTION
======================= */

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* =======================
   CORS CONFIGURATION
======================= */

app.use(
  cors({
    origin: true, // dynamically allow origin (best for deployment)
    credentials: true,
  })
);

/* =======================
   MIDDLEWARE
======================= */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   REQUEST LOGGER (Debug)
======================= */

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - content-type: ${req.headers["content-type"]}`
  );
  console.log("body:", req.body);
  next();
});

/* =======================
   ROUTES
======================= */

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Stock Trading Platform API Running");
});

// Auth routes
app.use("/", authRoute);

// Trade routes
app.use("/trade", tradeRoute);

/* =======================
   START SERVER
======================= */

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});