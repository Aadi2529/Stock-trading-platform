import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SellActionWindow = ({ symbol, price, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const userId = localStorage.getItem("userId");

  const handleSell = async () => {
    if (quantity <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/trade/order", {
        userId,
        symbol,
        type: "SELL",
        quantity,
      });

      toast.success(`Sold ${quantity} ${symbol} at ₹${res.data.price}`);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl w-96 p-6 space-y-5">

        <h3 className="text-lg font-semibold text-red-400">
          Sell {symbol}
        </h3>

        <div>
          <label className="text-sm text-gray-400">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full mt-2 bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>

        <div className="text-sm text-gray-400">
          Current Price: ₹{price}
        </div>

        <div className="text-sm text-gray-400">
          Total: ₹{(price * quantity).toFixed(2)}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSell}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Confirm Sell
          </button>
        </div>

      </div>
    </div>
  );
};

export default SellActionWindow;