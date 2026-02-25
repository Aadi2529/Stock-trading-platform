const Holding = require("../Models/Holding");
const Order = require("../Models/Order");
const Wallet = require("../Models/Wallet");

/* ================= MARKET SIMULATION ================= */

let market = {
  RELIANCE: 2500,
  TCS: 3500,
  INFY: 1500,
  HDFCBANK: 1600,
  SBIBANK: 1800,
};

// Update prices every 2 seconds
setInterval(() => {
  Object.keys(market).forEach((stock) => {
    const change = (Math.random() - 0.5) * 20;
    market[stock] = +(market[stock] + change).toFixed(2);
  });
}, 2000);

/* ================= GET MARKET ================= */

exports.getMarket = (req, res) => {
  res.json(market);
};

/* ================= PLACE ORDER ================= */

exports.placeOrder = async (req, res) => {
  try {
    const { userId, symbol, type, quantity } = req.body;

    if (!userId || !symbol || !type || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const price = market[symbol];

    if (!price) {
      return res.status(400).json({ message: "Invalid stock symbol" });
    }

    // ✅ THIS LINE MUST BE HERE
    const totalValue = price * quantity;

    let holding = await Holding.findOne({ userId, symbol });
    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 100000,
      });
    }

    /* ================= BUY ================= */

    if (type === "BUY") {

      if (wallet.balance < totalValue) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      wallet.balance -= totalValue;
      await wallet.save();

      if (!holding) {
        holding = await Holding.create({
          userId,
          symbol,
          quantity,
          avgPrice: price,
        });
      } else {
        const newQty = holding.quantity + quantity;
        const newAvg =
          (holding.avgPrice * holding.quantity + totalValue) / newQty;

        holding.quantity = newQty;
        holding.avgPrice = +newAvg.toFixed(2);
        await holding.save();
      }
    }

    /* ================= SELL ================= */

    else if (type === "SELL") {

      if (!holding || holding.quantity < quantity) {
        return res.status(400).json({ message: "Not enough shares" });
      }

      holding.quantity -= quantity;

      if (holding.quantity === 0) {
        await Holding.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      wallet.balance += totalValue;
      await wallet.save();
    }

    else {
      return res.status(400).json({ message: "Invalid order type" });
    }

    /* ================= SAVE ORDER ================= */

    await Order.create({
      userId,
      symbol,
      type,
      quantity,
      price,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      message: "Order executed successfully",
      price,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET HOLDINGS ================= */

exports.getHoldings = async (req, res) => {
  try {
    const { userId } = req.params;

    const holdings = await Holding.find({ userId });

    // Enrich with live price + unrealized P&L
    const enriched = holdings.map((h) => {
      const livePrice = market[h.symbol] || 0;
      const pnl = (livePrice - h.avgPrice) * h.quantity;

      return {
        ...h._doc,
        livePrice,
        pnl: +pnl.toFixed(2),
      };
    });

    res.json(enriched);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
};

/* ================= GET ORDERS ================= */

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
 /* ================= GET WALLET ================= */
exports.getWallet = async (req, res) => {
  const { userId } = req.params;

  let wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    wallet = await Wallet.create({
      userId,
      balance: 100000,
    });
  }

  res.json(wallet);
};