import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Watchlist = ({ onTradeComplete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [market, setMarket] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("BUY");

  useEffect(() => {
    const fetchMarket = async () => {
      const res = await axios.get(`${BACKEND_URL}/trade/market`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setMarket(res.data || {});

      if (!selectedStock && Object.keys(res.data).length > 0) {
        setSelectedStock(Object.keys(res.data)[0]);
      }
    };

    fetchMarket();
  }, []);

  const price = market[selectedStock] || 0;

  const chartData = useMemo(() => {
    return Object.entries(market).map(([s, p]) => ({
      name: s,
      value: p,
    }));
  }, [market]);

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">

      {/* LEFT STOCK LIST */}
      <div className="w-60 bg-[#0b0f14] border-r border-gray-800 overflow-y-auto">

        <div className="p-4 border-b border-gray-800 font-semibold">
          Watchlist
        </div>

        {Object.entries(market).map(([symbol, p]) => (
          <div
            key={symbol}
            onClick={() => setSelectedStock(symbol)}
            className={`px-4 py-3 cursor-pointer border-b border-gray-800 hover:bg-[#111827] ${
              selectedStock === symbol ? "bg-[#111827]" : ""
            }`}
          >
            <div className="flex justify-between">
              <span>{symbol}</span>
              <span className="text-green-400 text-sm">
                ₹{p.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

      </div>

      {/* CENTER CHART */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0b0f14]">
          <div>
            <h1 className="text-xl font-bold">
              {selectedStock}
            </h1>
            <p className="text-green-400 text-sm">
              ₹{price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 p-6 bg-black">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RIGHT TRADE PANEL */}
      <div className="w-80 bg-[#0b0f14] border-l border-gray-800 p-6 space-y-6">

        <div className="flex">
          <button
            onClick={() => setActiveTab("BUY")}
            className={`flex-1 py-2 ${
              activeTab === "BUY"
                ? "bg-green-600"
                : "bg-gray-700"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab("SELL")}
            className={`flex-1 py-2 ${
              activeTab === "SELL"
                ? "bg-red-600"
                : "bg-gray-700"
            }`}
          >
            Sell
          </button>
        </div>

        <div>
          <label className="text-sm text-gray-400">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full mt-2 bg-black border border-gray-600 rounded-lg px-3 py-2"
          />
        </div>

        <div className="text-sm text-gray-400">
          Current Price: ₹{price.toFixed(2)}
        </div>

        <div className="text-sm text-gray-400">
          Total: ₹{(price * quantity).toFixed(2)}
        </div>

        <button
          className={`w-full py-3 rounded-lg font-semibold ${
            activeTab === "BUY"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {activeTab} {selectedStock}
        </button>

      </div>

    </div>
  );
};

export default Watchlist;