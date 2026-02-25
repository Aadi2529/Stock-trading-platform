import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Star,
  Bell,
  Info,
  Trash2,
  X,
} from "lucide-react";
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
  const [market, setMarket] = useState({});
  const [prevMarket, setPrevMarket] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBuy, setActiveBuy] = useState(null);
  const [activeSell, setActiveSell] = useState(null);
  const [activeAnalytics, setActiveAnalytics] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [focusedStock, setFocusedStock] = useState(null);
  const stockListRef = useRef(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await axios.get("http://localhost:4000/trade/market");
        setPrevMarket(market);
        setMarket(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarket();

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favoritesStocks");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!focusedStock) return;

      const key = e.key.toUpperCase();

      switch (key) {
        case "B":
          setActiveBuy(focusedStock);
          break;
        case "S":
          setActiveSell(focusedStock);
          break;
        case "A":
          setActiveAnalytics(focusedStock);
          break;
        case "ArrowUp":
          e.preventDefault();
          // Navigate to previous stock
          const stocks = filteredStocks.map(([s]) => s);
          const currentIndex = stocks.indexOf(focusedStock);
          if (currentIndex > 0) {
            setFocusedStock(stocks[currentIndex - 1]);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          // Navigate to next stock
          const stocks2 = filteredStocks.map(([s]) => s);
          const currentIndex2 = stocks2.indexOf(focusedStock);
          if (currentIndex2 < stocks2.length - 1) {
            setFocusedStock(stocks2[currentIndex2 + 1]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [focusedStock]);

  const filteredStocks = Object.entries(market).filter(([symbol]) =>
    symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare chart data
  const chartData = {
    labels: filteredStocks.map(([symbol]) => symbol),
    datasets: [
      {
        label: "Price",
        data: filteredStocks.map(([, price]) => price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const toggleFavorite = (symbol) => {
    let newFavorites;
    if (favorites.includes(symbol)) {
      newFavorites = favorites.filter((s) => s !== symbol);
    } else {
      newFavorites = [...favorites, symbol];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favoritesStocks", JSON.stringify(newFavorites));
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#0b1220] text-white p-6 border-r border-white/10 overflow-y-auto">

      {/* Search Container */}
      <div className="mb-6">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search eg: TCS, INFY, RELIANCE (or use arrow keys + B/S/A)"
            className="flex-1 bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <span className="text-xs text-gray-400">
          {filteredStocks.length} / {Object.keys(market).length}
        </span>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-3 mb-8" ref={stockListRef}>
        {filteredStocks.length > 0 ? (
          filteredStocks.map(([symbol, price]) => {
            const prev = prevMarket[symbol];
            const isUp = price >= prev;
            const percent = prev ? (((price - prev) / prev) * 100).toFixed(2) : 0;
            const isFavorite = favorites.includes(symbol);

            return (
              <WatchListItem
                key={symbol}
                symbol={symbol}
                price={price}
                percent={percent}
                isUp={isUp}
                isFavorite={isFavorite}
                onToggleFavorite={() => toggleFavorite(symbol)}
                isFocused={focusedStock === symbol}
                onFocus={() => setFocusedStock(symbol)}
                onBuyClick={() => setActiveBuy(symbol)}
                onSellClick={() => setActiveSell(symbol)}
                onAnalyticsClick={() => setActiveAnalytics(symbol)}
              />
            );
          })
        ) : (
          <div className="text-center text-gray-400 py-4">
            No stocks found
          </div>
        )}
      </div>

      {/* Chart */}
      {filteredStocks.length > 0 && (
        <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 border-dashed">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">
            Watchlist Distribution
          </p>
          <div className="flex items-center justify-center">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#9ca3af",
                      font: { size: 12 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {activeAnalytics && (
        <AnalyticsModal
          symbol={activeAnalytics}
          price={market[activeAnalytics]}
          onClose={() => setActiveAnalytics(null)}
        />
      )}

      {/* Buy/Sell Modals */}
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
    <li
      className="list-none"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
      }}
      onClick={onFocus}
    >
      <div
        className={`bg-[#1e293b] p-4 rounded-lg border transition cursor-pointer ${
          isFocused
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-700 hover:border-blue-600"
        }`}
      >
        <div className="flex justify-between items-center">
          
          {/* Left - Stock Name with Star */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="hover:scale-125 transition"
            >
              <Star
                size={16}
                className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}
              />
            </button>
            <p className={`font-semibold text-sm ${isUp ? "text-green-400" : "text-red-400"}`}>
              {symbol}
            </p>
          </div>

          {/* Right - Stock Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">{percent}%</span>
              {isUp ? (
                <ChevronUp className="text-green-400" size={18} />
              ) : (
                <ChevronDown className="text-red-400" size={18} />
              )}
            </div>
            <span className={`font-semibold text-sm ${isUp ? "text-green-400" : "text-red-400"}`}>
              ₹{price?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions - Shown on Hover or Focus */}
        {(showActions || isFocused) && (
          <WatchListActions
            symbol={symbol}
            onBuyClick={onBuyClick}
            onSellClick={onSellClick}
            onAnalyticsClick={onAnalyticsClick}
          />
        )}
      </div>
    </li>
  );
};

const WatchListActions = ({
  symbol,
  onBuyClick,
  onSellClick,
  onAnalyticsClick,
}) => {
  const [tooltips, setTooltips] = useState({});

  const handleMouseEnter = (action) => {
    setTooltips((prev) => ({ ...prev, [action]: true }));
  };

  const handleMouseLeave = (action) => {
    setTooltips((prev) => ({ ...prev, [action]: false }));
  };

  return (
    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700">
      {/* Buy Button */}
      <div className="relative flex-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick();
          }}
          onMouseEnter={() => handleMouseEnter("buy")}
          onMouseLeave={() => handleMouseLeave("buy")}
          className="w-full bg-green-500/20 text-green-400 px-3 py-2 rounded-lg hover:bg-green-500 hover:text-white text-xs font-medium transition"
        >
          Buy
        </button>
        {tooltips.buy && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded whitespace-nowrap z-50">
            Buy (B)
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>

      {/* Sell Button */}
      <div className="relative flex-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSellClick();
          }}
          onMouseEnter={() => handleMouseEnter("sell")}
          onMouseLeave={() => handleMouseLeave("sell")}
          className="w-full bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white text-xs font-medium transition"
        >
          Sell
        </button>
        {tooltips.sell && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded whitespace-nowrap z-50">
            Sell (S)
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>

      {/* Analytics Button */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnalyticsClick();
          }}
          onMouseEnter={() => handleMouseEnter("analytics")}
          onMouseLeave={() => handleMouseLeave("analytics")}
          className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          <BarChart3 size={16} />
        </button>
        {tooltips.analytics && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-gray-200 text-xs rounded whitespace-nowrap z-50">
            Analytics (A)
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnalyticsModal = ({ symbol, price, onClose }) => {
  const [alertPrice, setAlertPrice] = useState(price || "");

  const mockAnalytics = {
    symbol,
    price,
    high52w: (price * 1.2).toFixed(2),
    low52w: (price * 0.8).toFixed(2),
    pe: (Math.random() * 30 + 10).toFixed(2),
    marketCap: `₹${(Math.random() * 100 + 50).toFixed(0)}K Cr`,
    volume: Math.floor(Math.random() * 1000000),
    avgVolume: Math.floor(Math.random() * 800000),
    eps: (Math.random() * 100 + 20).toFixed(2),
    dividendYield: (Math.random() * 5).toFixed(2),
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl w-96 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-blue-400">{symbol} Analytics</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Price */}
        <div className="bg-[#0f172a] p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Current Price</p>
          <p className="text-2xl font-bold text-green-400">₹{price?.toFixed(2)}</p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">52W High</p>
            <p className="text-lg font-semibold">₹{mockAnalytics.high52w}</p>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">52W Low</p>
            <p className="text-lg font-semibold">₹{mockAnalytics.low52w}</p>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">P/E Ratio</p>
            <p className="text-lg font-semibold">{mockAnalytics.pe}</p>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">Market Cap</p>
            <p className="text-lg font-semibold text-sm">{mockAnalytics.marketCap}</p>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">Volume</p>
            <p className="text-lg font-semibold">{mockAnalytics.volume.toLocaleString()}</p>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg">
            <p className="text-gray-400 text-xs">EPS</p>
            <p className="text-lg font-semibold">₹{mockAnalytics.eps}</p>
          </div>
        </div>

        {/* Price Alert */}
        <div className="border-t border-gray-700 pt-4">
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <Bell size={14} /> Set Price Alert
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e.target.value)}
              placeholder="Enter alert price"
              className="flex-1 bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition">
              Set
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Watchlist;