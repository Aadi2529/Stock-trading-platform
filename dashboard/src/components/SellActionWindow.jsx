import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X, Plus, Minus } from "lucide-react";

const SellActionWindow = ({
  symbol,
  price,
  onClose,
  onSuccess,
  maxQuantity = null,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const total = price * quantity;

  /* ================= MODAL CONTROL ================= */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleSell();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [quantity]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  /* ================= VALIDATION ================= */

  useEffect(() => {
    if (quantity <= 0) {
      setErrorMsg("Quantity must be greater than 0");
    } else if (maxQuantity && quantity > maxQuantity) {
      setErrorMsg("Cannot sell more than owned");
    } else {
      setErrorMsg("");
    }
  }, [quantity, maxQuantity]);

  /* ================= SELL LOGIC ================= */

  const handleSell = async () => {
    if (loading) return;

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

  /* ================= UI ================= */

  return (
    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-[#1e293b] border border-gray-700 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-red-400 tracking-wide">
            Sell {symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quantity Section */}
        <div>
          <label className="text-sm text-gray-400">
            Quantity
          </label>

          <div className="flex items-center mt-2 bg-[#0f172a] border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className="px-3 py-2 text-gray-400 hover:text-white"
            >
              <Minus size={16} />
            </button>

            <input
              ref={inputRef}
              type="number"
              min="1"
              max={maxQuantity || undefined}
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="w-full text-center bg-transparent outline-none py-2"
            />

            <button
              onClick={() =>
                setQuantity((q) =>
                  maxQuantity
                    ? Math.min(maxQuantity, q + 1)
                    : q + 1
                )
              }
              className="px-3 py-2 text-gray-400 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Quick Buttons */}
          <div className="flex gap-2 mt-3">
            {[1, 5, 10].map((q) => (
              <button
                key={q}
                onClick={() =>
                  setQuantity(
                    maxQuantity
                      ? Math.min(q, maxQuantity)
                      : q
                  )
                }
                className="text-xs px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                {q}
              </button>
            ))}

            {maxQuantity && (
              <button
                onClick={() => setQuantity(maxQuantity)}
                className="text-xs px-3 py-1 bg-red-600/30 text-red-400 rounded hover:bg-red-600/50 transition"
              >
                Max
              </button>
            )}
          </div>

          {maxQuantity && (
            <p className="text-xs text-gray-500 mt-2">
              Available: {maxQuantity}
            </p>
          )}

          {errorMsg && (
            <p className="text-xs text-red-400 mt-2">
              {errorMsg}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-[#0f172a] p-4 rounded-xl space-y-3 border border-gray-700">
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Current Price</span>
            <span>₹{price?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-white">
            <span>Total</span>
            <span className="text-red-400">
              ₹{total.toFixed(2)}
            </span>
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
            disabled={
              loading ||
              quantity <= 0 ||
              (maxQuantity && quantity > maxQuantity)
            }
            className={`px-4 py-2 rounded-lg font-medium transition ${
              loading ||
              quantity <= 0 ||
              (maxQuantity && quantity > maxQuantity)
                ? "bg-red-800 cursor-not-allowed"
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