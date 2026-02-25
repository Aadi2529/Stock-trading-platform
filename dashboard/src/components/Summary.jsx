import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Summary = () => {
  const account = {
    totalValue: 84500,
    dayPnl: 1250,
    dayPnlPercent: 1.5,
    totalInvestment: 76000,
    totalPnl: 8500,
  };
  const username = localStorage.getItem("username") || "Trader";

  const isDayProfit = account.dayPnl >= 0;
  const isTotalProfit = account.totalPnl >= 0;

  const chartData = [
    { time: "9AM", value: 80000 },
    { time: "10AM", value: 81000 },
    { time: "11AM", value: 80500 },
    { time: "12PM", value: 82000 },
    { time: "1PM", value: 83500 },
    { time: "2PM", value: 84500 },
  ];

  const transactions = [
    { stock: "TCS", type: "BUY", qty: 5, price: 3500 },
    { stock: "INFY", type: "SELL", qty: 3, price: 1500 },
    { stock: "RELIANCE", type: "BUY", qty: 2, price: 2600 },
  ];

  return (
    <div className="space-y-8">

      {/* Greeting */}
      <div>
        <h2 className="text-xl font-semibold text-gray-200">
          Welcome, {username}!
        </h2>
        <div className="h-px bg-gray-800 mt-3"></div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-4 gap-6">

        {/* Total Account Value */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total Account Value</p>
          <h3 className="text-2xl font-bold text-blue-400 mt-2">
            ₹{account.totalValue.toLocaleString()}
          </h3>
        </div>

        {/* Day P&L */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Day P&L</p>
          <h3
            className={`text-2xl font-bold mt-2 ${
              isDayProfit ? "text-green-400" : "text-red-400"
            }`}
          >
            ₹{account.dayPnl.toLocaleString()}
            <span className="text-sm ml-2">
              ({isDayProfit ? "+" : ""}
              {account.dayPnlPercent}%)
            </span>
          </h3>
        </div>

        {/* Total Investment */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total Investment</p>
          <h3 className="text-2xl font-bold text-gray-200 mt-2">
            ₹{account.totalInvestment.toLocaleString()}
          </h3>
        </div>

        {/* Total P&L */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total P&L</p>
          <h3
            className={`text-2xl font-bold mt-2 ${
              isTotalProfit ? "text-green-400" : "text-red-400"
            }`}
          >
            ₹{account.totalPnl.toLocaleString()}
          </h3>
        </div>

      </div>

      {/* Portfolio Performance Chart */}
      <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">
          Portfolio Performance (Today)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#6b7280" />
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
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="py-3 text-gray-200">{tx.stock}</td>
                <td
                  className={`py-3 font-medium ${
                    tx.type === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.type}
                </td>
                <td className="py-3 text-gray-300">{tx.qty}</td>
                <td className="py-3 text-gray-300">
                  ₹{tx.price.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Summary;