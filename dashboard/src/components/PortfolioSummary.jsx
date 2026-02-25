import { useEffect, useState } from "react";
import axios from "axios";

const PortfolioSummary = ({ refreshTrigger }) => {
  const [holdings, setHoldings] = useState([]);
  const [market, setMarket] = useState({});
  const [wallet, setWallet] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const h = await axios.get(
        `http://localhost:4000/trade/holdings/${userId}`
      );
      const m = await axios.get(
        `http://localhost:4000/trade/market`
      );
      const w = await axios.get(
        `http://localhost:4000/trade/wallet/${userId}`
      );

      setHoldings(h.data);
      setMarket(m.data);
      setWallet(w.data);
    };

    fetchData();
  }, [userId, refreshTrigger]);

  const invested = holdings.reduce(
    (acc, h) => acc + h.avgPrice * h.quantity,
    0
  );

  const current = holdings.reduce((acc, h) => {
    const live = market[h.symbol] || 0;
    return acc + live * h.quantity;
  }, 0);

  const pnl = current - invested;

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">

      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">Wallet Balance</p>
        <p className="text-xl font-bold">
          ₹ {wallet?.balance?.toFixed(2)}
        </p>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">Invested</p>
        <p className="text-xl font-bold">
          ₹ {invested.toFixed(2)}
        </p>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">Current Value</p>
        <p className="text-xl font-bold">
          ₹ {current.toFixed(2)}
        </p>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">Total P&L</p>
        <p
          className={`text-xl font-bold ${
            pnl >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          ₹ {pnl.toFixed(2)}
        </p>
      </div>

    </div>
  );
};

export default PortfolioSummary;