import React from "react";

const Trading = () => {
  return (
    <div className="pt-32 pb-24 bg-white text-gray-900">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-24">
        <h1 className="text-4xl lg:text-5xl font-bold">
          TradeNova Trading Platform
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
          A structured trading system prototype designed to simulate
          real-world order placement, portfolio tracking, and execution logic.
        </p>
      </section>

      {/* Market Overview */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold mb-6">Market Overview</h2>
        <p className="text-gray-600 leading-relaxed">
          Users can explore stock listings, view price changes,
          and analyze performance through interactive charts.
          The interface dynamically updates based on backend data.
        </p>
      </section>

      {/* Order Execution */}
      <section className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Order Execution Flow</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When a user places a trade:
          </p>

          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Frontend sends request to backend API</li>
            <li>Backend validates user authentication</li>
            <li>System checks available balance</li>
            <li>Trade is stored in database</li>
            <li>Portfolio & PnL are recalculated</li>
          </ul>
        </div>
      </section>

      {/* Portfolio Management */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 mb-24">
        <h2 className="text-3xl font-bold mb-6">Portfolio Management</h2>
        <p className="text-gray-600 leading-relaxed">
          TradeNova automatically updates holdings after each transaction.
          Real-time profit and loss are computed using stored trade history
          and current price data.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16 text-center">
        <h3 className="text-2xl font-semibold">
          Explore the TradeNova Dashboard
        </h3>
        <p className="text-gray-600 mt-4">
          Experience the trading workflow in action.
        </p>
      </section>

    </div>
  );
};

export default Trading;