import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const PortfolioSummary = ({ refreshTrigger }) => {
  const [holdings, setHoldings] = useState([]);
  const [market, setMarket] = useState({});
  const [wallet, setWallet] = useState(null);
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

        const [h, m, w] = await Promise.all([
          axios.get(`${BACKEND_URL}/trade/holdings/${userId}`, {
            headers,
          }),
          axios.get(`${BACKEND_URL}/trade/market`, {
            headers,
          }),
          axios.get(`${BACKEND_URL}/trade/wallet/${userId}`, {
            headers,
          }),
        ]);

        if (!isMounted) return;

        setHoldings(h.data || []);
        setMarket(m.data || {});
        setWallet(w.data || null);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to load portfolio");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [userId, refreshTrigger, BACKEND_URL, token]);

  /* ================= CALCULATIONS (MEMOIZED) ================= */

  const { invested, current, pnl, pnlPercent } = useMemo(() => {
    const investedAmount = holdings.reduce(
      (acc, h) => acc + h.avgPrice * h.quantity,
      0
    );

    const currentAmount = holdings.reduce((acc, h) => {
      const live = market[h.symbol] || 0;
      return acc + live * h.quantity;
    }, 0);

    const totalPnl = currentAmount - investedAmount;
    const percent =
      investedAmount > 0
        ? (totalPnl / investedAmount) * 100
        : 0;

    return {
      invested: investedAmount,
      current: currentAmount,
      pnl: totalPnl,
      pnlPercent: percent,
    };
  }, [holdings, market]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 h-24"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Wallet */}
      <SummaryCard
        title="Wallet Balance"
        value={`₹ ${wallet?.balance?.toFixed(2) || "0.00"}`}
      />

      {/* Invested */}
      <SummaryCard
        title="Invested"
        value={`₹ ${invested.toFixed(2)}`}
      />

      {/* Current Value */}
      <SummaryCard
        title="Current Value"
        value={`₹ ${current.toFixed(2)}`}
      />

      {/* P&L */}
      <SummaryCard
        title="Total P&L"
        value={`₹ ${pnl.toFixed(2)}`}
        subValue={`${pnlPercent.toFixed(2)}%`}
        isPositive={pnl >= 0}
      />
    </div>
  );
};

/* ================= CARD COMPONENT ================= */

const SummaryCard = ({
  title,
  value,
  subValue,
  isPositive,
}) => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition">
      <p className="text-gray-400 text-sm mb-2">{title}</p>

      <div className="flex items-end justify-between">
        <p
          className={`text-xl font-bold ${
            title === "Total P&L"
              ? isPositive
                ? "text-green-400"
                : "text-red-400"
              : "text-white"
          }`}
        >
          {value}
        </p>

        {subValue && (
          <span
            className={`text-sm ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default PortfolioSummary;