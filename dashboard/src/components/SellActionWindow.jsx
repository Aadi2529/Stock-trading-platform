import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SellActionWindow = ({ symbol, price, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleSell = async () => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    if (quantity <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/trade/order`,
        {
          userId,
          symbol,
          type: "SELL",
          quantity,
        },
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        }
      );

      toast.success(
        `Sold ${quantity} ${symbol} at ₹${Number(res.data.price).toFixed(2)}`
      );

      if (onSuccess) onSuccess();

      onClose();
    } catch (err) {
      console.error("Sell failed:", err);
      toast.error(
        err.response?.data?.message || "Order failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl w-96 p-6 space-y-5 shadow-xl">

        <h3 className="text-lg font-semibold text-red-400">
          Sell {symbol}
        </h3>

        <div>
          <label className="text-sm text-gray-400">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full mt-2 bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
            className="px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSell}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Confirm Sell
          </button>
        </div>

      </div>
    </div>
  );
};

export default SellActionWindow;