import React from "react";
import Menu from "./Menu";

const indices = [
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
  return (
    <div className="w-full h-16 bg-[#0f172a] border-b border-gray-800 flex items-center justify-between px-6">

      {/* Left Side - Market Indices */}
      <div className="flex gap-10">
        {indices.map((index, i) => {
          const isPositive = index.change >= 0;

          return (
            <div key={i} className="flex items-center gap-3">
              <p className="text-sm text-gray-400 font-medium">
                {index.name}
              </p>

              <p className="text-sm font-semibold text-gray-200">
                {index.value.toLocaleString()}
              </p>

              <p
                className={`text-sm font-semibold ${
                  isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {index.change}
              </p>

              <p
                className={`text-xs ${
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

      {/* Right Side - Menu */}
      <Menu />
    </div>
  );
};

export default TopBar;