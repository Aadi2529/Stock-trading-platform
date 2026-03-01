import { useEffect, useState, useRef, useMemo, memo } from "react";
import axios from "axios";
import { BarChart3, Star, X } from "lucide-react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, ChartTooltip, Legend);

const Watchlist = ({ onTradeComplete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [market, setMarket] = useState({});
  const [prevMarket, setPrevMarket] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBuy, setActiveBuy] = useState(null);
  const [activeSell, setActiveSell] = useState(null);
  const [activeAnalytics, setActiveAnalytics] = useState(null);
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

  /* ================= FILTER (MEMOIZED) ================= */

  const filteredStocks = useMemo(() => {
    return Object.entries(market).filter(([symbol]) =>
      symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [market, searchTerm]);

  /* ================= CHART (MEMOIZED) ================= */

  const chartData = useMemo(() => {
    return {
      labels: filteredStocks.map(([symbol]) => symbol),
      datasets: [
        {
          label: "Price",
          data: filteredStocks.map(([, price]) => price),
          backgroundColor: [
            "rgba(59,130,246,0.5)",
            "rgba(34,197,94,0.5)",
            "rgba(239,68,68,0.5)",
            "rgba(168,85,247,0.5)",
            "rgba(234,179,8,0.5)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [filteredStocks]);

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-400">Loading market...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">{error}</div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#0b1220] text-white p-6 border-r border-white/10 overflow-y-auto">

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stocks"
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Stock List */}
      <div className="space-y-3 mb-8">
        {filteredStocks.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            No stocks found
          </div>
        )}

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
              onBuyClick={() => setActiveBuy(symbol)}
              onSellClick={() => setActiveSell(symbol)}
              onAnalyticsClick={() => setActiveAnalytics(symbol)}
            />
          );
        })}
      </div>

      {/* Chart */}
      {filteredStocks.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { color: "#9ca3af" },
                },
              },
            }}
          />
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

      {activeAnalytics && (
        <AnalyticsModal
          symbol={activeAnalytics}
          price={market[activeAnalytics]}
          onClose={() => setActiveAnalytics(null)}
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
  onToggleFavorite,
  isFocused,
  onFocus,
  onBuyClick,
  onSellClick,
  onAnalyticsClick,
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

      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick();
          }}
          className="flex-1 bg-green-500/20 text-green-400 px-3 py-2 rounded-lg hover:bg-green-500 hover:text-white text-xs transition"
        >
          Buy
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSellClick();
          }}
          className="flex-1 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white text-xs transition"
        >
          Sell
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnalyticsClick();
          }}
          className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          <BarChart3 size={16} />
        </button>
      </div>
    </div>
  );
};

const MemoWatchListItem = memo(WatchListItem);

/* ================= ANALYTICS MODAL ================= */

const AnalyticsModal = ({ symbol, price, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1e293b] border border-gray-700 rounded-xl w-96 p-6 space-y-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-blue-400">
            {symbol} Analytics
          </h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="bg-[#0f172a] p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Current Price</p>
          <p className="text-2xl font-bold text-green-400">
            ₹{price?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;