import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const generalContext = useContext(GeneralContext);

  const handleSellClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      if (res && res.data && res.data.order) {
        const order = res.data.order;
        window.dispatchEvent(new CustomEvent("localOrderCreated", { detail: order }));
      }

      // close the sell window via context
      generalContext.closeSellWindow();
    } catch (err) {
      console.error("Failed to place sell order:", err.message || err);
      // still close the window, or keep it open based on desired UX
      generalContext.closeSellWindow();
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
              min={1}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

          <div className="buttons small-gap">
        <span>Margin required ₹140.65</span>
        <div>
              <button type="button" className="btn btn-blue btn-compact" onClick={handleSellClick}>
            Sell
          </button>
              <button type="button" className="btn btn-grey btn-compact" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
