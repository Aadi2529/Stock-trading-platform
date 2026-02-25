import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Summary from "./Summary";
import Orders from "./Orders";
import Watchlist from "./Watchlist";
// import Holding from "../../../backend/Models/Holding";
import Holdings from "./Holdings";
import Positions from "./Positions";
import PortfolioSummary from "./PortfolioSummary";
import { useTradeRefresh } from "../hooks/useTradeRefresh";

const Dashboard = () => {
  const { refreshTrigger, triggerRefresh } = useTradeRefresh();

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

    // Remove sensitive data from URL
    window.history.replaceState({}, document.title, "/");

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "http://localhost:5173/login";
    }

  }, []);

return (
  <div className="w-full h-screen bg-[#0f172a] text-white flex">

    {/* LEFT SIDE - WATCHLIST */}
    <div className="w-[320px] border-r border-gray-800 bg-[#111827]">
      <Watchlist onTradeComplete={triggerRefresh} />
    </div>

    {/* RIGHT SIDE - MAIN AREA */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {/* TOP SUMMARY ALWAYS VISIBLE */}
      <PortfolioSummary refreshTrigger={refreshTrigger} />

      {/* ROUTED CONTENT */}
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="orders" element={<Orders refreshTrigger={refreshTrigger} />} />
        <Route path="holdings" element={<Holdings refreshTrigger={refreshTrigger} />} />
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
);
};

export default Dashboard;