import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Summary = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username") || "Trader";
  const token = localStorage.getItem("token");

  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [market, setMarket] = useState({});

  useEffect(() => {
    if (!userId || !BACKEND_URL) return;

    const fetchData = async () => {
      try {
        const [h, o, w, m] = await Promise.all([
          axios.get(`${BACKEND_URL}/trade/holdings/${userId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          axios.get(`${BACKEND_URL}/trade/orders/${userId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          axios.get(`${BACKEND_URL}/trade/wallet/${userId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          axios.get(`${BACKEND_URL}/trade/market`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
        ]);

        setHoldings(h.data || []);
        setOrders(o.data || []);
        setWallet(w.data || null);
        setMarket(m.data || {});
      } catch (err) {
        console.error("Failed to fetch summary data:", err);
      }
    };

    fetchData();
  }, [userId, BACKEND_URL, token]);

  /* ================= CALCULATIONS ================= */

  const invested = holdings.reduce(
    (acc, h) => acc + h.avgPrice * h.quantity,
    0
  );

  const currentValue = holdings.reduce((acc, h) => {
    const live = market[h.symbol] || 0;
    return acc + live * h.quantity;
  }, 0);

  const totalPnl = currentValue - invested;

  const totalAccountValue =
    (wallet?.balance || 0) + currentValue;

  const isProfit = totalPnl >= 0;

  /* ================= CHART DATA ================= */

  const chartData = holdings.map((h) => ({
    name: h.symbol,
    value: (market[h.symbol] || 0) * h.quantity,
  }));

  /* ================= RECENT TRANSACTIONS ================= */

  const recentTransactions = orders.slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Greeting */}
      <div>
        <h2 className="text-xl font-semibold text-gray-200">
          Welcome, {username}!
        </h2>
        <div className="h-px bg-gray-800 mt-3"></div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total Account Value</p>
          <h3 className="text-2xl font-bold text-blue-400 mt-2">
            ₹{totalAccountValue.toFixed(2)}
          </h3>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Invested</p>
          <h3 className="text-2xl font-bold text-gray-200 mt-2">
            ₹{invested.toFixed(2)}
          </h3>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Current Value</p>
          <h3 className="text-2xl font-bold text-gray-200 mt-2">
            ₹{currentValue.toFixed(2)}
          </h3>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total P&L</p>
          <h3
            className={`text-2xl font-bold mt-2 ${
              isProfit ? "text-green-400" : "text-red-400"
            }`}
          >
            ₹{totalPnl.toFixed(2)}
          </h3>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
          Portfolio Allocation
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
          Recent Transactions
        </h3>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="py-3 text-gray-200">{tx.symbol}</td>
                  <td
                    className={`py-3 font-medium ${
                      tx.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="py-3 text-gray-300">
                    {tx.quantity}
                  </td>
                  <td className="py-3 text-gray-300">
                    ₹{Number(tx.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default Summary;