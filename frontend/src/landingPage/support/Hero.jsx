import React from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function SupportHero() {
  return (
    <section className="pt-32 pb-20 bg-[#f8fafc] border-b">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            Support Portal
          </h1>

          {/* My Tickets Button */}
          <Link
            to="/my-tickets"
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
          >
            My Tickets
          </Link>

        </div>

        {/* Search Bar */}
        <div className="mt-10">
          <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Icon */}
            <div className="px-4 text-gray-400">
              <Search size={20} />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
              className="flex-1 py-4 px-2 outline-none text-gray-700"
            />

            {/* Button */}
            <button className="px-6 py-4 text-red-500 font-medium hover:bg-red-50 transition">
              Search
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}