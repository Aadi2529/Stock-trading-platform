import React, { useEffect, useState } from "react";
import Menu from "./Menu";

const initialIndices = [
  {
    name: "NIFTY 50",
    value: 22450.35,
    change: 102.45,
    percent: 0.46,
  },
  {
    name: "SENSEX",
    value: 74210.88,
    change: -180.25,
    percent: -0.24,
  },
];

const TopBar = () => {
  const [indices, setIndices] = useState(initialIndices);
  const [flashIndex, setFlashIndex] = useState(null);

  // 🔥 Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((item, i) => {
          const randomChange = (Math.random() - 0.5) * 20;
          const newValue = item.value + randomChange;

          setFlashIndex(i);
          setTimeout(() => setFlashIndex(null), 500);

          return {
            ...item,
            value: newValue,
            change: randomChange,
            percent: ((randomChange / item.value) * 100).toFixed(2),
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-800 shadow-md">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3">

        {/* Left Side - Indices */}
        <div className="flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar">

          {indices.map((index, i) => {
            const isPositive = index.change >= 0;

            return (
              <div
                key={i}
                className={`flex items-center gap-2 sm:gap-3 min-w-max 
                transition-all duration-300 hover:bg-gray-800/50 
                px-3 py-1.5 rounded-lg cursor-pointer`}
              >
                {/* Live Dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>

                <p className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                  {index.name}
                </p>

                <p
                  className={`text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    flashIndex === i
                      ? isPositive
                        ? "text-green-400 scale-110"
                        : "text-red-400 scale-110"
                      : "text-gray-200"
                  }`}
                >
                  {index.value.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>

                <p
                  className={`text-xs sm:text-sm font-semibold ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {index.change.toFixed(2)}
                </p>

                <p
                  className={`text-[10px] sm:text-xs ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ({isPositive ? "+" : ""}
                  {index.percent}%)
                </p>
              </div>
            );
          })}

        </div>

        {/* Right Side */}
        <div className="ml-3 flex-shrink-0">
          <Menu />
        </div>

      </div>
    </div>
  );
};

export default TopBar;