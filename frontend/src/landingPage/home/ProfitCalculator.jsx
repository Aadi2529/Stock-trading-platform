import { useState } from "react";
import { Check } from "lucide-react";

const ProfitCalculator = () => {
  const [accountSize, setAccountSize] = useState(1000);
  const [profitRate, setProfitRate] = useState(0.5);

  const monthlyProfit = ((accountSize * profitRate) / 100).toFixed(2);

  return (
    <section className="relative py-24 bg-[#f8f9fb] overflow-hidden">
      
      {/* Background Circle */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT - CALCULATOR CARD */}
          <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg mx-auto">

            <h3 className="text-center font-semibold mb-6 text-lg">
              Select Account Size
            </h3>

            {/* Account Size */}
            <div className="text-center text-xl font-semibold mb-4">
              ${accountSize.toLocaleString()}
            </div>

            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={accountSize}
              onChange={(e) => setAccountSize(Number(e.target.value))}
              className="w-full accent-red-500"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-8">
              <span>$1,000</span>
              <span>$100,000</span>
            </div>

            {/* Profit Rate */}
            <h3 className="text-center font-semibold mb-6 text-lg">
              Profit Rate
            </h3>

            <div className="text-center text-xl font-semibold mb-4">
              {profitRate}%
            </div>

            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={profitRate}
              onChange={(e) => setProfitRate(Number(e.target.value))}
              className="w-full accent-red-500"
            />

            <div className="flex justify-between text-sm text-gray-500 mt-2 mb-8">
              <span>0.5%</span>
              <span>10%</span>
            </div>

            {/* Result + Button */}
            <div className="flex items-center justify-between mt-6">
              <div className="bg-black text-white px-6 py-3 rounded-full text-xl font-bold">
                ${monthlyProfit}
                <span className="text-sm font-medium"> /Month</span>
              </div>

              <button className="border border-red-500 text-red-500 px-6 py-3 rounded-full hover:bg-red-500 hover:text-white transition">
                START TRADING
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="text-red-500 font-semibold mb-3 uppercase tracking-wider text-sm">
              Profit Calculator
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Estimate the earnings for a full time trader
            </h2>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Trouble that are bound to ensue; and equal blame belongs to
              those who fail in their duty through weakness.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="text-red-500" />
                <span>Accurate Profit Calculation</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-red-500" />
                <span>Risk Management</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-red-500" />
                <span>Improved Decision Making</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfitCalculator;