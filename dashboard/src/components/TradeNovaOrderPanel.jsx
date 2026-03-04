import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X, Plus, Minus } from "lucide-react";
import { createPortal } from "react-dom";

const TradeNovaOrderPanel = ({
  symbol,
  price,
  type = "BUY",
  maxQuantity = null,
  onClose,
  onSuccess,
}) => {

  const [orderType, setOrderType] = useState(type);
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

      if (e.key === "Enter") executeOrder();

    };

    window.addEventListener("keydown", handleKey);

    return () => {

      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);

    };

  }, []);

  const handleOutsideClick = (e) => {

    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }

  };

  /* ================= VALIDATION ================= */

  useEffect(() => {

    if (quantity <= 0) {
      setErrorMsg("Quantity must be greater than 0");
    } else if (
      orderType === "SELL" &&
      maxQuantity &&
      quantity > maxQuantity
    ) {
      setErrorMsg("Cannot sell more than owned");
    } else {
      setErrorMsg("");
    }

  }, [quantity, orderType, maxQuantity]);

  /* ================= EXECUTE ORDER ================= */

  const executeOrder = async () => {

    if (loading) return;

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/trade/order`,
        {
          userId,
          symbol,
          type: orderType,
          quantity,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      toast.success(
        `${orderType} ${quantity} ${symbol} at ₹${Number(
          res.data.price
        ).toFixed(2)}`
      );

      onSuccess?.();

      onClose();

    } catch (err) {

      toast.error(err.response?.data?.message || "Order failed");

    } finally {

      setLoading(false);

    }

  };

  /* ================= UI ================= */

  const modalUI = (

    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
    >

      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-[#0b0f19] border border-gray-700 rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl"
      >

        {/* Header */}

        <div className="flex justify-between items-center">

          <h3 className="text-lg font-semibold text-white">
            Trade {symbol}
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* BUY SELL SWITCH */}

        <div className="flex bg-[#111827] rounded-lg overflow-hidden">

          <button
            onClick={() => setOrderType("BUY")}
            className={`flex-1 py-2 text-sm font-medium transition ${
              orderType === "BUY"
                ? "bg-[#00FFA3] text-black"
                : "text-gray-400"
            }`}
          >
            BUY
          </button>

          <button
            onClick={() => setOrderType("SELL")}
            className={`flex-1 py-2 text-sm font-medium transition ${
              orderType === "SELL"
                ? "bg-[#FF4D6D] text-white"
                : "text-gray-400"
            }`}
          >
            SELL
          </button>

        </div>

        {/* Quantity */}

        <div>

          <label className="text-sm text-gray-400">
            Quantity
          </label>

          <div className="flex items-center mt-2 bg-[#0f172a] border border-gray-700 rounded-lg overflow-hidden">

            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-400 hover:text-white"
            >
              <Minus size={16} />
            </button>

            <input
              ref={inputRef}
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full text-center bg-transparent outline-none py-2"
            />

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-gray-400 hover:text-white"
            >
              <Plus size={16} />
            </button>

          </div>

          {maxQuantity && orderType === "SELL" && (

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

        <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-700">

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Price</span>
            <span>₹{price?.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold mt-2">

            <span>Total</span>

            <span
              className={
                orderType === "BUY"
                  ? "text-[#00FFA3]"
                  : "text-[#FF4D6D]"
              }
            >
              ₹{total.toFixed(2)}
            </span>

          </div>

        </div>

        {/* Confirm */}

        <button
          onClick={executeOrder}
          disabled={loading || errorMsg}
          className={`w-full py-3 rounded-lg font-medium transition ${
            orderType === "BUY"
              ? "bg-[#00FFA3] text-black hover:brightness-110"
              : "bg-[#FF4D6D] text-white hover:brightness-110"
          }`}
        >

          {loading
            ? "Processing..."
            : orderType === "BUY"
            ? "Confirm Buy"
            : "Confirm Sell"}

        </button>

      </div>

    </div>

  );

  return createPortal(modalUI, document.body);

};

export default TradeNovaOrderPanel;