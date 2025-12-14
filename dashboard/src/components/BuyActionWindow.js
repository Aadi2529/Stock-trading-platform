import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      

      // Dispatch a local event immediately so UI updates without waiting
      if (res && res.data && res.data.order) {
        const order = res.data.order;
        window.dispatchEvent(new CustomEvent("localOrderCreated", { detail: order }));
      }

      // close the buy window via context
      generalContext.closeBuyWindow();
    } catch (err) {
      console.error("Failed to place order:", err.message || err);
      // still close the window, or keep it open based on desired UX
      generalContext.closeBuyWindow();
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container modal-full-mobile" id="buy-window" draggable="true">
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
          <button type="button" className="btn btn-blue btn-compact" onClick={handleBuyClick}>
            Buy
          </button>
          <button type="button" className="btn btn-grey btn-compact" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
