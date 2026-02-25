import React from "react";
import { TrendingUp, BarChart3, ShieldCheck, Activity } from "lucide-react";

const Awards = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-red-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Built for Modern
              <span className="text-red-500"> Traders</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
              Practice trading with realistic market simulations,
              track your performance, and sharpen your strategies
              before entering real markets.
            </p>

            {/* Features */}
           <div className="grid sm:grid-cols-2 gap-8 mt-12">

              <div className="flex gap-4 items-start">
                <TrendingUp className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Order Execution Engine</h4>
                  <p className="text-sm text-gray-500">
                    Virtual trade execution with balance validation logic.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <BarChart3 className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Advanced Market Charts</h4>
                  <p className="text-sm text-gray-500">
                    Interactive price visualization and trend analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Authentication & Security</h4>
                  <p className="text-sm text-gray-500">
                    JWT-based login system with protected routes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Activity className="text-red-500" size={24} />
                <div>
                  <h4 className="font-semibold">Portfolio & PnL Tracking</h4>
                  <p className="text-sm text-gray-500">
                    Real-time profit/loss computation and holdings update.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* </div> */}

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200">
              <img
                src="media/images/tradingDashboard.png"
                alt="trading-dashboard"
                className="w-full max-w-xl rounded-lg"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Awards;