import { useEffect, useState, useMemo, memo } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const Watchlist = ({ onTradeComplete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [market, setMarket] = useState({});
  const [prevMarket, setPrevMarket] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBuy, setActiveBuy] = useState(null);
  const [activeSell, setActiveSell] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [focusedStock, setFocusedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= MARKET FETCH ================= */

  useEffect(() => {
    if (!BACKEND_URL) return;

    let isMounted = true;

    const fetchMarket = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/trade/market`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!isMounted) return;

        setPrevMarket(market);
        setMarket(res.data || {});
        setLoading(false);

        if (!focusedStock && Object.keys(res.data).length > 0) {
          setFocusedStock(Object.keys(res.data)[0]);
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to load market");
        setLoading(false);
      }
    };

    fetchMarket();
    const interval = setInterval(fetchMarket, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [BACKEND_URL, token]);

  /* ================= FAVORITES ================= */

  useEffect(() => {
    const saved = localStorage.getItem("favoritesStocks");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (symbol) => {
    const updated = favorites.includes(symbol)
      ? favorites.filter((s) => s !== symbol)
      : [...favorites, symbol];

    setFavorites(updated);
    localStorage.setItem("favoritesStocks", JSON.stringify(updated));
  };

  /* ================= FILTER ================= */

  const filteredStocks = useMemo(() => {
    return Object.entries(market).filter(([symbol]) =>
      symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [market, searchTerm]);

  /* ================= UI STATES ================= */

  if (loading) {
    return <div className="p-6 text-gray-400">Loading market...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  const currentPrice = market[focusedStock] || 0;

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#0b1220] text-white p-6 overflow-y-auto space-y-8">

      {/* Search */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stocks"
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Stock List */}
      <div className="space-y-3">
        {filteredStocks.map(([symbol, price]) => {
          const prev = prevMarket[symbol];
          const isUp = prev ? price >= prev : true;
          const percent = prev
            ? (((price - prev) / prev) * 100).toFixed(2)
            : "0.00";

          return (
            <MemoWatchListItem
              key={symbol}
              symbol={symbol}
              price={price}
              percent={percent}
              isUp={isUp}
              isFavorite={favorites.includes(symbol)}
              isFocused={focusedStock === symbol}
              onFocus={() => setFocusedStock(symbol)}
              onToggleFavorite={() => toggleFavorite(symbol)}
            />
          );
        })}
      </div>

      {/* ================= TRADING SECTION ================= */}

      {focusedStock && (
        <div className="bg-[#111827] rounded-xl p-6 border border-gray-700 space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">
                {focusedStock}
              </h3>
              <p className="text-green-400 text-sm">
                ₹{currentPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Object.entries(market).map(([s, p]) => ({
                  name: s,
                  value: p,
                }))}
              >
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

          {/* Buy / Sell Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveBuy(focusedStock)}
              className="bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition"
            >
              Buy
            </button>

            <button
              onClick={() => setActiveSell(focusedStock)}
              className="bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition"
            >
              Sell
            </button>
          </div>

        </div>
      )}

      {/* Modals */}
      {activeBuy && (
        <BuyActionWindow
          symbol={activeBuy}
          price={market[activeBuy]}
          onClose={() => setActiveBuy(null)}
          onSuccess={onTradeComplete}
        />
      )}

      {activeSell && (
        <SellActionWindow
          symbol={activeSell}
          price={market[activeSell]}
          onClose={() => setActiveSell(null)}
          onSuccess={onTradeComplete}
        />
      )}
    </div>
  );
};

/* ================= OPTIMIZED ITEM ================= */

const WatchListItem = ({
  symbol,
  price,
  percent,
  isUp,
  isFavorite,
  isFocused,
  onFocus,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={onFocus}
      className={`bg-[#1e293b] p-4 rounded-lg border transition cursor-pointer ${
        isFocused
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700 hover:border-blue-600"
      }`}
    >
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Star
              size={16}
              className={
                isFavorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-500"
              }
            />
          </button>

          <p className="font-semibold text-sm">{symbol}</p>
        </div>

        <div className="text-right">
          <p
            className={`text-xs ${
              isUp ? "text-green-400" : "text-red-400"
            }`}
          >
            {isUp ? "+" : ""}
            {percent}%
          </p>

          <p
            className={`font-semibold text-sm ${
              isUp ? "text-green-400" : "text-red-400"
            }`}
          >
            ₹{price?.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
};

const MemoWatchListItem = memo(WatchListItem);

export default Watchlist;