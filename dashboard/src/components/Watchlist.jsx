import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BarChart3, Star, X } from "lucide-react";

import TradeNovaOrderPanel from "./TradeNovaOrderPanel";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import AnalyticsModal from "./AnalyticsModal";
import { useContext } from "react";
import { ChartContext } from "../context/ChartContext";

ChartJS.register(ArcElement, ChartTooltip, Legend);

const Watchlist = ({ onTradeComplete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [market, setMarket] = useState({});
  const [prevMarket, setPrevMarket] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [tradeStock, setTradeStock] = useState(null);
  const [activeAnalytics, setActiveAnalytics] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [focusedStock, setFocusedStock] = useState(null);

  const stockListRef = useRef(null);

  /* ================= REAL TIME MARKET ================= */

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/trade/market`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setPrevMarket(market);
        setMarket(res.data || {});
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarket();

    const interval = setInterval(fetchMarket, 3000);

    return () => clearInterval(interval);
  }, [BACKEND_URL]);

  /* ================= FAVORITES ================= */

  useEffect(() => {
    const saved = localStorage.getItem("favoritesStocks");

    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (symbol) => {
    let updated;

    if (favorites.includes(symbol)) {
      updated = favorites.filter((s) => s !== symbol);
    } else {
      updated = [...favorites, symbol];
    }

    setFavorites(updated);

    localStorage.setItem("favoritesStocks", JSON.stringify(updated));
  };

  /* ================= FILTER ================= */

  const filteredStocks = Object.entries(market).filter(([symbol]) =>
    symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!focusedStock) return;

      const stocks = filteredStocks.map(([s]) => s);

      const index = stocks.indexOf(focusedStock);

      switch (e.key.toUpperCase()) {
        case "B":
          setTradeStock({
            symbol: focusedStock,
            type: "BUY",
          });
          break;

        case "S":
          setTradeStock({
            symbol: focusedStock,
            type: "SELL",
          });
          break;

        case "A":
          setActiveAnalytics(focusedStock);
          break;

        case "ARROWUP":
          e.preventDefault();
          if (index > 0) setFocusedStock(stocks[index - 1]);
          break;

        case "ARROWDOWN":
          e.preventDefault();
          if (index < stocks.length - 1) setFocusedStock(stocks[index + 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [focusedStock, filteredStocks]);

  /* ================= CHART ================= */

  const chartData = {
    labels: filteredStocks.map(([s]) => s),

    datasets: [
      {
        label: "Price",
        data: filteredStocks.map(([, p]) => p),

        backgroundColor: [
          "rgba(59,130,246,0.5)",
          "rgba(34,197,94,0.5)",
          "rgba(239,68,68,0.5)",
          "rgba(168,85,247,0.5)",
        ],
      },
    ],
  };

  /* ================= UI ================= */

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#0b1220] text-white p-6 border-r border-white/10 overflow-y-auto">
      {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stocks (B / S)"
          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-sm"
        />

        <span className="text-xs text-gray-400">
          {filteredStocks.length} / {Object.keys(market).length}
        </span>
      </div>

      {/* STOCK LIST */}

      <div className="space-y-3 mb-8" ref={stockListRef}>
        {filteredStocks.map(([symbol, price]) => {
          const prev = prevMarket[symbol];

          const isUp = prev ? price >= prev : true;

          const percent = prev
            ? (((price - prev) / prev) * 100).toFixed(2)
            : "0.00";

          return (
            <WatchListItem
              key={symbol}
              symbol={symbol}
              price={price}
              percent={percent}
              isUp={isUp}
              isFavorite={favorites.includes(symbol)}
              isFocused={focusedStock === symbol}
              onFocus={() => {
                setFocusedStock(symbol);
                setSelectedSymbol(symbol);
              }}
              onToggleFavorite={() => toggleFavorite(symbol)}
              onBuyClick={() =>
                setTradeStock({
                  symbol,
                  type: "BUY",
                })
              }
              onSellClick={() =>
                setTradeStock({
                  symbol,
                  type: "SELL",
                })
              }
              onAnalyticsClick={() => setActiveAnalytics(symbol)}
            />
          );
        })}
      </div>

      {/* CHART */}

      {filteredStocks.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-4">Watchlist Distribution</p>

          <Doughnut data={chartData} />
        </div>
      )}

      {/* TRADE PANEL */}

      {tradeStock && (
        <TradeNovaOrderPanel
          symbol={tradeStock.symbol}
          price={market[tradeStock.symbol]}
          type={tradeStock.type}
          onClose={() => setTradeStock(null)}
          onSuccess={onTradeComplete}
        />
      )}

      {/* ANALYTICS */}

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

/* ================= WATCHLIST ITEM ================= */

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
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onFocus}
      className={`bg-[#1e293b] p-4 rounded-lg border cursor-pointer transition ${
        isFocused ? "border-blue-500" : "border-gray-700 hover:border-blue-600"
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
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
              }
            />
          </button>

          <p className="font-semibold text-sm">{symbol}</p>
        </div>

        <span
          className={`text-sm font-semibold ${
            isUp ? "text-green-400" : "text-red-400"
          }`}
        >
          ₹{price?.toFixed(2)}
        </span>
      </div>

      {(showActions || isFocused) && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyClick();
            }}
            className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg text-xs hover:bg-green-500 hover:text-white"
          >
            Buy
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSellClick();
            }}
            className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg text-xs hover:bg-red-500 hover:text-white"
          >
            Sell
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAnalyticsClick();
            }}
            className="px-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            <BarChart3 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// /* ================= ANALYTICS ================= */

// const AnalyticsModal = ({ symbol, price, onClose }) => {

//   return (

//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

//       <div className="bg-[#1e293b] border border-gray-700 rounded-xl w-96 p-6 space-y-4">

//         <div className="flex justify-between items-center">

//           <h3 className="text-xl font-semibold text-blue-400">
//             {symbol} Analytics
//           </h3>

//           <button onClick={onClose}>
//             <X size={20} />
//           </button>

//         </div>

//         <div className="bg-[#0f172a] p-4 rounded-lg">

//           <p className="text-gray-400 text-sm">
//             Current Price
//           </p>

//           <p className="text-2xl font-bold text-green-400">
//             ₹{price?.toFixed(2)}
//           </p>

//         </div>

//         <button
//           onClick={onClose}
//           className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
//         >
//           Close
//         </button>

//       </div>

//     </div>

//   );

// };

export default Watchlist;
