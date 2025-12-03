require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { storeOTP, verifyOTP, getLastOTP } = require("./utils/otpService");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req,res)=>{
  let newOrder = new OrdersModel({
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode: req.body.mode
  })

  newOrder.save();
  res.send("Order Saved!!!")
})

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// ============ AUTHENTICATION ROUTES ============

// Register - Signup
app.post("/register", async (req, res) => {
  try {
    console.log("📝 Registration request received");
    const { email, mobile, password, firstName, lastName } = req.body;
    console.log("📝 Inputs:", { email, mobile, firstName, lastName });

    // Validate input
    if (!email || !mobile || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Email, mobile, and password are required" });
    }

    console.log("📝 Checking for existing user...");
    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "Email or mobile already registered" });
    }

    console.log("📝 Creating new user...");
    // Create new user
    const newUser = new UserModel({
      email,
      mobile,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    console.log("📝 Saving user...");
    await newUser.save();
    console.log("✅ User saved successfully");

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("✅ Registration successful");
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        mobile: newUser.mobile,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ message: "Email/Mobile and password are required" });
    }

    // Find user by email or mobile
    const user = await UserModel.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Send OTP to mobile
app.post("/sendOtp", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // Store OTP (mock SMS service logs to console)
    const otp = storeOTP(mobile);

    res.status(200).json({
      message: "OTP sent successfully",
      mobile,
      // In production, don't send OTP in response
      // otp is logged to console for testing
    });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// Verify OTP
app.post("/verifyOtp", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile and OTP are required" });
    }

    const isValid = verifyOTP(mobile, otp);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      message: "OTP verified successfully",
      verified: true,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
});

// Verify JWT Token (utility endpoint)
app.get("/verifyToken", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({
      message: "Token is valid",
      userId: decoded.userId,
      email: decoded.email,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
});

// TEST ENDPOINT - Get last OTP (for testing only - remove in production)
app.get("/testLastOtp", (req, res) => {
  const lastOtp = getLastOTP();
  if (!lastOtp) {
    return res.status(404).json({ message: "No OTP generated yet" });
  }
  res.status(200).json({
    message: "Last generated OTP (for testing only)",
    ...lastOtp,
    warning: "⚠️  Remove this endpoint in production!"
  });
});

// Connect to MongoDB before listening
mongoose.connect(URL).then(() => {
  app.listen(PORT, () => {
    console.log("✅ App started on port " + PORT);
    console.log("✅ DB Connected");
  });
}).catch(err => {
  console.error("❌ DB Connection Error:", err);
  process.exit(1);
});

// Global error handler
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
