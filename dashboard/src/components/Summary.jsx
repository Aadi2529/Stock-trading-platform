import React, { useEffect, useState, useMemo } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !BACKEND_URL) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [h, o, w, m] = await Promise.all([
          axios.get(`${BACKEND_URL}/trade/holdings/${userId}`, { headers }),
          axios.get(`${BACKEND_URL}/trade/orders/${userId}`, { headers }),
          axios.get(`${BACKEND_URL}/trade/wallet/${userId}`, { headers }),
          axios.get(`${BACKEND_URL}/trade/market`, { headers }),
        ]);

        if (!isMounted) return;

        setHoldings(h.data || []);
        setOrders(o.data || []);
        setWallet(w.data || null);
        setMarket(m.data || {});
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to load dashboard summary");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId, BACKEND_URL, token]);

  /* ================= CALCULATIONS (MEMOIZED) ================= */

  const {
    invested,
    currentValue,
    totalPnl,
    pnlPercent,
    totalAccountValue,
  } = useMemo(() => {
    const investedAmount = holdings.reduce(
      (acc, h) => acc + h.avgPrice * h.quantity,
      0
    );

    const currentAmount = holdings.reduce((acc, h) => {
      const live = market[h.symbol] || 0;
      return acc + live * h.quantity;
    }, 0);

    const pnl = currentAmount - investedAmount;
    const percent =
      investedAmount > 0
        ? (pnl / investedAmount) * 100
        : 0;

    return {
      invested: investedAmount,
      currentValue: currentAmount,
      totalPnl: pnl,
      pnlPercent: percent,
      totalAccountValue:
        (wallet?.balance || 0) + currentAmount,
    };
  }, [holdings, market, wallet]);

  const isProfit = totalPnl >= 0;

  /* ================= CHART DATA (MEMOIZED) ================= */

  const chartData = useMemo(() => {
    return holdings.map((h) => ({
      name: h.symbol,
      value: (market[h.symbol] || 0) * h.quantity,
    }));
  }, [holdings, market]);

  const recentTransactions = useMemo(
    () => orders.slice(0, 5),
    [orders]
  );

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-40 bg-gray-700 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-[#1e293b] rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
        {error}
      </div>
    );
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <SummaryCard
          title="Total Account Value"
          value={`₹${totalAccountValue.toFixed(2)}`}
          highlight="text-blue-400"
        />

        <SummaryCard
          title="Invested"
          value={`₹${invested.toFixed(2)}`}
        />

        <SummaryCard
          title="Current Value"
          value={`₹${currentValue.toFixed(2)}`}
        />

        <SummaryCard
          title="Total P&L"
          value={`₹${totalPnl.toFixed(2)}`}
          subValue={`${pnlPercent.toFixed(2)}%`}
          highlight={
            isProfit ? "text-green-400" : "text-red-400"
          }
        />
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
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
      )}

      {/* Recent Transactions */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 overflow-x-auto">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
          Recent Transactions
        </h3>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-400">
            No transactions yet.
          </p>
        ) : (
          <table className="w-full text-sm min-w-[500px]">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-3 text-left">Stock</th>
                <th className="pb-3 text-left">Type</th>
                <th className="pb-3 text-left">Qty</th>
                <th className="pb-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="py-3">{tx.symbol}</td>
                  <td
                    className={`py-3 font-medium ${
                      tx.type === "BUY"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="py-3">
                    {tx.quantity}
                  </td>
                  <td className="py-3">
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

/* ================= CARD ================= */

const SummaryCard = ({
  title,
  value,
  subValue,
  highlight = "text-white",
}) => {
  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-blue-500 transition">
      <p className="text-gray-400 text-sm">{title}</p>

      <div className="flex items-end justify-between mt-2">
        <h3 className={`text-2xl font-bold ${highlight}`}>
          {value}
        </h3>
        {subValue && (
          <span className={highlight}>
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default Summary;