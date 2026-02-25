import { useEffect, useState } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [market, setMarket] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const h = await axios.get(
          `http://localhost:4000/trade/holdings/${userId}`
        );

        const m = await axios.get(
          `http://localhost:4000/trade/market`
        );

        setPositions(h.data);
        setMarket(m.data);
      } catch (err) {
        console.error("Failed to fetch positions:", err.message);
      }
    };

    fetchData();
  }, [userId]);

  /* ===== CALCULATE TOTALS ===== */

  const totalPnl = positions.reduce((acc, p) => {
    const live = market[p.symbol] || 0;
    return acc + (live - p.avgPrice) * p.quantity;
  }, 0);

  return (
    <div className="text-white space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Positions ({positions.length})
        </h2>

        <div
          className={`text-lg font-bold ${
            totalPnl >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          Total P&L: ₹ {totalPnl.toFixed(2)}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#0f172a] border-b border-gray-700 text-gray-400">
            <tr>
              <th className="p-4 text-left">Instrument</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Avg Price</th>
              <th className="p-4 text-left">LTP</th>
              <th className="p-4 text-left">Invested</th>
              <th className="p-4 text-left">Current Value</th>
              <th className="p-4 text-left">P&L</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((p) => {
              const live = market[p.symbol] || 0;
              const invested = p.avgPrice * p.quantity;
              const current = live * p.quantity;
              const pnl = current - invested;

              return (
                <tr
                  key={p._id}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{p.symbol}</td>

                  <td className="p-4">{p.quantity}</td>

                  <td className="p-4">
                    ₹{p.avgPrice.toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₹{live.toFixed(2)}
                  </td>

                  <td className="p-4 text-gray-400">
                    ₹{invested.toFixed(2)}
                  </td>

                  <td className="p-4 text-gray-400">
                    ₹{current.toFixed(2)}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      pnl >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Positions;