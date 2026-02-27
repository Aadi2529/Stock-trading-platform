const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authRoute = require("./Routes/AuthRoute");
const tradeRoute = require("./Routes/TradeRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL )
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


  app.get("/", (req, res) => {
    res.send("Welcome to the Stock Trading Platform API");
  });
  
// register middleware before routes
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174",
      "https://trade-nova-eight.vercel.app/",
      "https://stock-trading-platform-dashboard.vercel.app",
      ""
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
// parse x-www-form-urlencoded (for forms / Postman form-data)
app.use(express.urlencoded({ extended: true }));
// parse plain text bodies (some clients send raw text/plain)
app.use(express.text({ type: 'text/*' }));

// simple request logger to help debug incoming bodies
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - content-type: ${req.headers['content-type']}`);
  // body will be populated by parsers above
  console.log('body:', req.body);
  next();
});

// register routes
app.use("/", authRoute);
// all trade related routes will be prefixed with /trade
app.use("/trade", tradeRoute);



// start server after middleware and routes
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});