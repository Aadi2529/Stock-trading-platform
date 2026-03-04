import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AnalyticsModal = ({ symbol, price, onClose }) => {

  const [history, setHistory] = useState([]);

  /* ================= PRICE HISTORY ================= */

  useEffect(() => {

    setHistory((prev) => {

      const updated = [...prev, price];

      if (updated.length > 20) updated.shift();

      return updated;

    });

  }, [price]);

  /* ================= TREND ================= */

  const trend =
    history.length > 1
      ? history[history.length - 1] > history[0]
        ? "Bullish"
        : "Bearish"
      : "Neutral";

  /* ================= VOLATILITY ================= */

  const volatility = (() => {

    if (history.length < 2) return "Low";

    const avg =
      history.reduce((a, b) => a + b, 0) / history.length;

    const variance =
      history.reduce(
        (a, b) => a + Math.pow(b - avg, 2),
        0
      ) / history.length;

    const std = Math.sqrt(variance);

    if (std > 20) return "High";
    if (std > 10) return "Medium";

    return "Low";

  })();

  /* ================= CHART DATA ================= */

  const chartData = {
    labels: history.map((_, i) => i + 1),

    datasets: [
      {
        label: symbol,
        data: history,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#9ca3af" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
      },
      y: {
        ticks: { color: "#9ca3af" },
      },
    },
  };

  /* ================= UI ================= */

  const modalUI = (

    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">

      <div className="bg-[#0b0f19] border border-gray-700 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center">

          <h3 className="text-lg font-semibold text-blue-400">
            {symbol} Analytics
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Price */}

        <div className="bg-[#111827] p-4 rounded-lg">

          <p className="text-sm text-gray-400">
            Current Price
          </p>

          <p className="text-3xl font-bold text-green-400">
            ₹{price?.toFixed(2)}
          </p>

        </div>

        {/* Mini Chart */}

        <div className="bg-[#111827] p-4 rounded-lg">

          <Line data={chartData} options={chartOptions} />

        </div>

        {/* Indicators */}

        <div className="grid grid-cols-2 gap-3 text-sm">

          <div className="bg-[#111827] p-3 rounded-lg">
            <p className="text-gray-400">Trend</p>
            <p
              className={`font-semibold ${
                trend === "Bullish"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {trend}
            </p>
          </div>

          <div className="bg-[#111827] p-3 rounded-lg">
            <p className="text-gray-400">Volatility</p>
            <p className="font-semibold">
              {volatility}
            </p>
          </div>

        </div>

        {/* Close */}

        <button
          onClick={onClose}
          className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>

  );

  return createPortal(modalUI, document.body);

};

export default AnalyticsModal;