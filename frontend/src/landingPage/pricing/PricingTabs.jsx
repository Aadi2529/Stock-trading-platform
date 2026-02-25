import React, { useState } from "react";

const tabs = ["Equity", "Currency", "Commodity"];

const simulationData = {
  Equity: [
    {
      label: "Virtual Brokerage Model",
      value:
        "Simulated brokerage of 0.03% per trade (capped at ₹20) for realistic trading experience.",
    },
    {
      label: "Order Execution Engine",
      value:
        "Orders are executed instantly using latest available market price snapshot.",
    },
    {
      label: "Profit & Loss Calculation",
      value:
        "PnL = (Sell Price - Buy Price) × Quantity - Simulated Brokerage.",
    },
    {
      label: "Portfolio Update Logic",
      value:
        "Holdings and available balance are updated immediately after order validation.",
    },
  ],
  Currency: [
    {
      label: "Virtual Cost Model",
      value: "Flat ₹10 simulated charge per executed trade.",
    },
    {
      label: "Execution Strategy",
      value:
        "Currency trades executed based on mocked exchange price feed.",
    },
    {
      label: "Risk Validation",
      value:
        "System validates available virtual margin before trade execution.",
    },
  ],
  Commodity: [
    {
      label: "Simulated Brokerage",
      value: "0.02% virtual trading cost per transaction.",
    },
    {
      label: "Order Handling",
      value:
        "Trade execution based on last traded price simulation.",
    },
    {
      label: "Balance Protection",
      value:
        "Insufficient balance prevention before placing orders.",
    },
  ],
};

const PricingTabs = () => {
  const [active, setActive] = useState("Equity");

  return (
    <section className="pt-32 pb-24 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trading Engine & Cost Model
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent simulation logic used inside the trading platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-8 py-3 font-medium transition ${
                  active === tab
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm">
            <tbody>
              {simulationData[active].map((row, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-6 font-medium text-gray-700 w-1/3">
                    {row.label}
                  </td>
                  <td className="p-6 text-gray-600">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default PricingTabs;