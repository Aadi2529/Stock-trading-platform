// const mongoose = require("mongoose");

// const HoldingSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   symbol: String,
//   quantity: Number,
//   avgPrice: Number,
// });

// module.exports = mongoose.model("Holding", HoldingSchema);
// Models/HoldingModel.js
const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  symbol: String,
  quantity: Number,
  avgPrice: Number
});

module.exports = mongoose.model("Holding", holdingSchema);