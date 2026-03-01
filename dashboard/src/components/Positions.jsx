import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [market, setMarket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !BACKEND_URL) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [h, m] = await Promise.all([
          axios.get(`${BACKEND_URL}/trade/holdings/${userId}`, { headers }),
          axios.get(`${BACKEND_URL}/trade/market`, { headers }),
        ]);

        if (!isMounted) return;

        setPositions(h.data || []);
        setMarket(m.data || {});
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to fetch positions");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId, BACKEND_URL, token]);

  /* ===== Memoized Position Calculations ===== */
  const enrichedPositions = useMemo(() => {
    return positions.map((p) => {
      const live = market[p.symbol] || 0;
      const invested = p.avgPrice * p.quantity;
      const current = live * p.quantity;
      const pnl = current - invested;
      const pnlPercent =
        invested > 0 ? (pnl / invested) * 100 : 0;

      return {
        ...p,
        live,
        invested,
        current,
        pnl,
        pnlPercent,
      };
    });
  }, [positions, market]);

  /* ===== Sort by Highest Absolute PnL ===== */
  const sortedPositions = useMemo(() => {
    return [...enrichedPositions].sort(
      (a, b) => Math.abs(b.pnl) - Math.abs(a.pnl)
    );
  }, [enrichedPositions]);

  const totalPnl = useMemo(() => {
    return enrichedPositions.reduce(
      (acc, p) => acc + p.pnl,
      0
    );
  }, [enrichedPositions]);

  /* ===== UI STATES ===== */

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-700 rounded"></div>
        <div className="h-64 bg-[#1e293b] rounded-xl"></div>
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

  if (sortedPositions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">No open positions.</p>
        <p className="text-sm mt-2">
          Start trading to build your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="text-white space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Positions ({sortedPositions.length})
        </h2>

        <div
          className={`text-lg font-bold ${
            totalPnl >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          Total P&L: ₹ {totalPnl.toFixed(2)}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">

            <thead className="bg-[#0f172a] border-b border-gray-700 text-gray-400 sticky top-0">
              <tr>
                <th className="p-4 text-left">Instrument</th>
                <th className="p-4 text-left">Qty</th>
                <th className="p-4 text-left">Avg Price</th>
                <th className="p-4 text-left">LTP</th>
                <th className="p-4 text-left">Invested</th>
                <th className="p-4 text-left">Current</th>
                <th className="p-4 text-left">P&L</th>
                <th className="p-4 text-left">P&L %</th>
              </tr>
            </thead>

            <tbody>
              {sortedPositions.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">
                    {p.symbol}
                  </td>

                  <td className="p-4">
                    {p.quantity}
                  </td>

                  <td className="p-4">
                    ₹{p.avgPrice.toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₹{p.live.toFixed(2)}
                  </td>

                  <td className="p-4 text-gray-400">
                    ₹{p.invested.toFixed(2)}
                  </td>

                  <td className="p-4 text-gray-400">
                    ₹{p.current.toFixed(2)}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      p.pnl >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ₹{p.pnl.toFixed(2)}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      p.pnlPercent >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {p.pnlPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default Positions;