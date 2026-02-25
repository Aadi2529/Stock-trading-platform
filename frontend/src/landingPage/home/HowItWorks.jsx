import React from "react";

const steps = [
  {
    title: "User Authentication",
    desc: "Users register and log in using a secure JWT-based authentication system.",
  },
  {
    title: "Market Exploration",
    desc: "Browse available stocks and view real-time price data through interactive charts.",
  },
  {
    title: "Place Trade Order",
    desc: "Buy or sell orders are validated against available balance before execution.",
  },
  {
    title: "Portfolio Update",
    desc: "Holdings, transaction history, and profit/loss are recalculated instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-28 bg-[#f5f6fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-sm font-semibold text-red-600 mb-3 uppercase tracking-wider">
            How TradeNova Works
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold">
            Inside the Trading Engine
          </h2>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-300 -translate-y-1/2"></div>

          <div className="space-y-24 lg:space-y-0 lg:grid lg:grid-cols-4 relative z-10">

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? "lg:-translate-y-16" : "lg:translate-y-16"
                }`}
              >
                {/* Glowing Dot */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]"></div>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-xs hover:shadow-xl transition duration-300">
                  <span className="text-xs font-semibold text-gray-400">
                    STEP 0{index + 1}
                  </span>

                  <h4 className="text-xl font-semibold mt-4 mb-3">
                    {step.title}
                  </h4>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;