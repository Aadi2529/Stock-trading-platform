// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   symbol: String,
//   type: String, // BUY / SELL
//   quantity: Number,
//   price: Number,
//   status: { type: String, default: "EXECUTED" },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", OrderSchema);
// Models/OrderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  symbol: String,
  type: String, // BUY / SELL
  quantity: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);