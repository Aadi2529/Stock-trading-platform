import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Summary = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [market, setMarket] = useState({});
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("BUY");

  useEffect(() => {
    const fetchMarket = async () => {
      const res = await axios.get(
        `${BACKEND_URL}/trade/market`,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );
      setMarket(res.data || {});
    };

    fetchMarket();
  }, []);

  const price = market[selectedStock] || 0;

  const chartData = Object.keys(market).map((key) => ({
    name: key,
    value: market[key],
  }));

  return (
    <div className="min-h-screen bg-black text-white p-4">

      {/* STOCK SELECTOR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {selectedStock}
        </h1>

        <select
          value={selectedStock}
          onChange={(e) =>
            setSelectedStock(e.target.value)
          }
          className="bg-[#111827] border border-gray-700 rounded px-3 py-2"
        >
          {Object.keys(market).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* CHART SECTION */}
        <div className="flex-1 bg-[#111827] p-4 rounded-xl">

          <div className="text-lg font-semibold mb-4">
            ₹ {price.toFixed(2)}
          </div>

          <ResponsiveContainer width="100%" height={400}>
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

        {/* TRADE PANEL */}
        <div className="w-full lg:w-80 bg-[#111827] p-6 rounded-xl space-y-6">

          {/* BUY / SELL TAB */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("BUY")}
              className={`flex-1 py-2 rounded-l-lg ${
                activeTab === "BUY"
                  ? "bg-green-600"
                  : "bg-gray-700"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab("SELL")}
              className={`flex-1 py-2 rounded-r-lg ${
                activeTab === "SELL"
                  ? "bg-red-600"
                  : "bg-gray-700"
              }`}
            >
              Sell
            </button>
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-gray-400 text-sm">
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

          {/* PRICE INFO */}
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

    </div>
  );
};

export default Summary;