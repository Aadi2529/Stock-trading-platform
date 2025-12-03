const mongoose = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

const HoldingsModel =
  mongoose.models.holding || mongoose.model("holding", HoldingsSchema);

module.exports = { HoldingsModel };