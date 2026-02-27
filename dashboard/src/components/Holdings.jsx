import { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = ({ refreshTrigger }) => {
  const [holdings, setHoldings] = useState([]);
  const [market, setMarket] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!BACKEND_URL || !userId) return;

      try {
        const [h, m] = await Promise.all([
          axios.get(`${BACKEND_URL}/trade/holdings/${userId}`, {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
            withCredentials: true,
          }),
          axios.get(`${BACKEND_URL}/trade/market`, {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
            withCredentials: true,
          }),
        ]);

        setHoldings(h.data || []);
        setMarket(m.data || {});
      } catch (err) {
        console.error("Failed to fetch holdings:", err);
      }
    };

    fetchData();
  }, [userId, refreshTrigger, BACKEND_URL, token]);

  /* ================= CHART DATA ================= */

  const chartData = {
    labels: holdings.map((h) => h.symbol),
    datasets: [
      {
        label: "Current Value",
        data: holdings.map((h) => {
          const livePrice = market[h.symbol] || 0;
          return livePrice * h.quantity;
        }),
        backgroundColor: "rgba(34,197,94,0.6)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Holdings</h2>

      {holdings.length === 0 && (
        <div className="text-gray-400">
          No holdings available.
        </div>
      )}

      {holdings.map((h) => {
        const livePrice = market[h.symbol] || 0;
        const pnl = (livePrice - h.avgPrice) * h.quantity;

        return (
          <div
            key={h._id}
            className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{h.symbol}</p>
              <p className="text-sm text-gray-400">
                Qty: {h.quantity}
              </p>
              <p className="text-sm text-gray-400">
                Avg: ₹{h.avgPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">
                LTP: ₹{livePrice.toFixed(2)}
              </p>
            </div>

            <div
              className={`text-lg font-semibold ${
                pnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹ {pnl.toFixed(2)}
            </div>
          </div>
        );
      })}

      {holdings.length > 0 && (
        <div className="mt-10 bg-[#1e293b] p-6 rounded-xl border border-gray-700">
          <VerticalGraph data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Holdings;