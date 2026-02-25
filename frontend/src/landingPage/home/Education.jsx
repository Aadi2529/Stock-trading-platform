import React from "react";

const Education = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <img
              // src="media/images/education.svg"
              alt="TradeNova Learning"
              className="w-full max-w-md"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Learn. Analyze. Execute.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              TradeNova provides structured resources to understand
              trading workflows, portfolio management logic, and
              order execution systems.
            </p>

            <a
              href="/learn"
              className="inline-flex items-center gap-2 text-red-500 font-medium hover:underline hover:translate-x-1 transition"
            >
              Explore Learning Center →
            </a>

            <p className="text-gray-600 text-lg leading-relaxed mt-10 mb-6">
              Access strategy guides, technical documentation,
              and real-world trading concepts implemented
              inside the TradeNova platform.
            </p>

            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-red-500 font-medium hover:underline hover:translate-x-1 transition"
            >
              Read TradeNova Insights →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;