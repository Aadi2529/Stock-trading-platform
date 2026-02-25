const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  balance: { type: Number, default: 100000 }, // Starting with 1 lakh
});

module.exports = mongoose.model("Wallet", walletSchema);