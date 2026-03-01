import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Summary from "./Summary";
import Orders from "./Orders";
import Watchlist from "./Watchlist";
import Holdings from "./Holdings";
import Positions from "./Positions";
import PortfolioSummary from "./PortfolioSummary";
import { useTradeRefresh } from "../hooks/useTradeRefresh";

const Dashboard = () => {
  const { refreshTrigger, triggerRefresh } = useTradeRefresh();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // 🔐 Auth Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tokenFromUrl = params.get("token");
    const userIdFromUrl = params.get("userId");
    const usernameFromUrl = params.get("username");
    const emailFromUrl = params.get("email");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }

    if (userIdFromUrl || usernameFromUrl || emailFromUrl) {
      const userData = {
        id: userIdFromUrl,
        username: usernameFromUrl,
        email: emailFromUrl,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userIdFromUrl);
      localStorage.setItem("username", usernameFromUrl);
    }

    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex relative">

      {/* 🔥 Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full z-50 w-72 bg-[#111827] border-r border-gray-800 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Watchlist onTradeComplete={triggerRefresh} />
      </div>

      {/* 🔥 Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile Toggle Button */}
        <div className="lg:hidden p-4 border-b border-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition"
          >
            ☰ Open Watchlist
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Portfolio Summary */}
          <PortfolioSummary refreshTrigger={refreshTrigger} />

          {/* Routed Content */}
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route
              path="orders"
              element={<Orders refreshTrigger={refreshTrigger} />}
            />
            <Route
              path="holdings"
              element={<Holdings refreshTrigger={refreshTrigger} />}
            />
            <Route path="positions" element={<Positions />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-20 text-gray-400">
                  Page not found
                </div>
              }
            />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;