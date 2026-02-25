import React, { useState } from "react";

const Brokerage = () => {
  const [amount, setAmount] = useState(100000);
  const [segment, setSegment] = useState("intraday");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateBrokerage = () => {
    let brokerage = 0;

    if (segment === "delivery") brokerage = 0;
    else brokerage = Math.min(20, amount * 0.0003);

    const gst = brokerage * 0.18;
    const total = brokerage + gst;

    return {
      brokerage: brokerage.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const result = calculateBrokerage();

  return (
    <section className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Brokerage & Charges
          </h1>
          <p className="text-gray-600 mt-4">
            Transparent pricing. Real-time calculator.
          </p>
        </div>

        {/* CALCULATOR */}
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 mb-20">
          <h2 className="text-2xl font-semibold mb-6">
            Brokerage Calculator
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <label className="block mb-2 text-gray-600">
                Trade Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-600">
                Segment
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="delivery">Equity Delivery (₹0)</option>
                <option value="intraday">Intraday / F&O</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600">Brokerage:</p>
              <p className="text-xl font-semibold">
                ₹ {result.brokerage}
              </p>

              <p className="text-gray-600 mt-2">GST (18%):</p>
              <p className="text-xl font-semibold">
                ₹ {result.gst}
              </p>

              <p className="text-gray-900 mt-4 font-bold text-2xl">
                Total: ₹ {result.total}
              </p>
            </div>

          </div>

          {/* Expandable Breakdown */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="mt-8 text-red-500 font-medium hover:underline"
          >
            {showBreakdown ? "Hide detailed breakdown" : "View detailed breakdown"}
          </button>

          {showBreakdown && (
            <div className="mt-6 bg-gray-50 p-6 rounded-xl text-sm text-gray-600">
              Brokerage = Min(₹20, 0.03% of trade value)  
              GST = 18% of brokerage  
              Total = Brokerage + GST
            </div>
          )}
        </div>

        {/* COMPARISON TABLE */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">

            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-5 font-semibold">Broker</th>
                <th className="p-5 font-semibold">Delivery</th>
                <th className="p-5 font-semibold">Intraday</th>
                <th className="p-5 font-semibold">F&O</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">

              <tr className="border-t bg-red-50 animate-pulse">
                <td className="p-5 font-bold text-red-600">TradePro</td>
                <td className="p-5 font-semibold text-red-500">₹0</td>
                <td className="p-5">₹20 / 0.03%</td>
                <td className="p-5">₹20</td>
              </tr>

              <tr className="border-t">
                <td className="p-5">Competitor A</td>
                <td className="p-5">₹20</td>
                <td className="p-5">₹20</td>
                <td className="p-5">₹20</td>
              </tr>

              <tr className="border-t">
                <td className="p-5">Competitor B</td>
                <td className="p-5">₹15</td>
                <td className="p-5">₹20</td>
                <td className="p-5">₹20</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default Brokerage;