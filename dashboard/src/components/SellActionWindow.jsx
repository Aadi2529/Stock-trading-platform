import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const SellActionWindow = ({
  symbol,
  price,
  onClose,
  onSuccess,
  maxQuantity = null, // optional: pass holding qty
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  /* ================= MODAL BEHAVIOR ================= */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  /* ================= SELL LOGIC ================= */

  const handleSell = async () => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    if (quantity <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    if (maxQuantity && quantity > maxQuantity) {
      toast.error("Cannot sell more than owned");
      return;
    }

    if (!BACKEND_URL) {
      toast.error("Backend not configured");
      return;
    }

    try {
      setLoading(true);

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
        }
      );

      toast.success(
        `Sold ${quantity} ${symbol} at ₹${Number(
          res.data.price
        ).toFixed(2)}`
      );

      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Order failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const total = (price * quantity).toFixed(2);

  /* ================= UI ================= */

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-[#1e293b] border border-gray-700 rounded-xl w-full max-w-md p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-red-400">
            Sell {symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm text-gray-400">
            Quantity
          </label>
          <input
            ref={inputRef}
            type="number"
            min="1"
            max={maxQuantity || undefined}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full mt-2 bg-[#0f172a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
          />
          {maxQuantity && (
            <p className="text-xs text-gray-500 mt-1">
              Available: {maxQuantity}
            </p>
          )}
        </div>

        {/* Price Info */}
        <div className="bg-[#0f172a] p-4 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Current Price</span>
            <span>₹{price?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-white">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSell}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              loading
                ? "bg-red-700 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Processing..." : "Confirm Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;