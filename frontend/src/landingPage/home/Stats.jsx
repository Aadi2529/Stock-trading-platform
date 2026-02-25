const Stats = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-10">
              Built with Reliability & Precision
            </h1>

            <div className="space-y-8">

              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Structured Backend Architecture
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Modular controller-route-model pattern ensuring clean
                  separation of concerns and maintainability.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Secure Authentication System
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  JWT-based login system with protected routes and
                  session validation.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Real-Time Portfolio Computation
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Automated balance validation, trade execution logic,
                  and profit/loss recalculation.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE VISUAL */}
          <div className="text-center lg:text-right">
            <img
              src="media/images/tradingDashboard.png"
              alt="TradeNova Platform"
              className="w-full max-w-md mx-auto lg:ml-auto mb-8"
            />

            <div className="flex justify-center lg:justify-end gap-8 flex-wrap">
              <a
                href="/dashboard"
                className="text-red-500 font-medium hover:underline hover:translate-x-1 transition"
              >
                Explore Dashboard →
              </a>

              <a
                href="/about"
                className="text-red-500 font-medium hover:underline hover:translate-x-1 transition"
              >
                Learn About TradeNova →
              </a>
            </div>
          </div>

        </div>

        {/* Technical Highlights Row */}
        <div className="mt-20 border-t pt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-3xl font-bold text-red-500">JWT</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Secure Authentication
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-red-500">REST API</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Backend Integration
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-red-500">MongoDB</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Persistent Storage
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-red-500">React</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Dynamic Frontend
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;