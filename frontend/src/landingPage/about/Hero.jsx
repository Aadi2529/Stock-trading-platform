import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-28 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Top Heading */}
        <div className="text-center mb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Building the Future of
            <span className="text-red-500"> Risk-Free Trading</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            We created a powerful stock trading simulator to help
            learners and aspiring investors practice with confidence.
          </p>
        </div>

        {/* Content Section */}
        <div className="border-t border-gray-200 pt-16">
          <div className="grid lg:grid-cols-2 gap-16 text-gray-600 text-lg leading-relaxed">

            {/* Left Column */}
            <div className="space-y-6">
              <p>
                Our journey started with a simple problem — most beginners
                enter the stock market without practical experience.
                The result? Emotional decisions and financial losses.
              </p>

              <p>
                We built this platform to simulate real market conditions
                so users can learn, experiment, and develop strategies
                without risking actual money.
              </p>

              <p>
                Whether you're a student, aspiring trader, or someone
                curious about investing, our goal is to give you a
                realistic and structured environment to grow.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <p>
                Our platform combines real-time data visualization,
                performance tracking, and intuitive dashboards
                to deliver a professional trading experience.
              </p>

              <p>
                We believe financial education should be accessible,
                practical, and technology-driven.
              </p>

              <p>
                This is just the beginning. We're continuously improving
                the platform to make trading education smarter,
                faster, and more interactive.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;