const router = require("express").Router();
const TradeController = require("../Controllers/TradeController");

router.get("/market", TradeController.getMarket);

router.post("/order", TradeController.placeOrder);

router.get("/holdings/:userId", TradeController.getHoldings);

router.get("/orders/:userId", TradeController.getOrders);

router.get("/wallet/:userId", TradeController.getWallet);

module.exports = router;