import React from "react";

const PricingHero = () => {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Pricing Plans
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Simple and transparent pricing for every learner.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Free
            </h2>

            <p className="text-center text-4xl font-bold mb-6">
              ₹0
            </p>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Virtual trading with demo balance</li>
              <li>✔ Basic portfolio tracking</li>
              <li>✔ Order history</li>
              <li>✔ Responsive dashboard</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl p-10 border-2 border-red-500 shadow-lg hover:shadow-2xl transition duration-300 relative">
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Popular
            </span>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Pro
            </h2>

            <p className="text-center text-4xl font-bold mb-6">
              ₹499<span className="text-base font-medium">/month</span>
            </p>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Everything in Free</li>
              <li>✔ Advanced charts & analytics</li>
              <li>✔ Performance insights</li>
              <li>✔ Strategy tracking tools</li>
            </ul>
          </div>

          {/* Enterprise / Advanced */}
          <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Advanced
            </h2>

            <p className="text-center text-4xl font-bold mb-6">
              ₹999<span className="text-base font-medium">/month</span>
            </p>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Everything in Pro</li>
              <li>✔ Real-time simulated competitions</li>
              <li>✔ Custom trading strategies</li>
              <li>✔ Priority support</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingHero;