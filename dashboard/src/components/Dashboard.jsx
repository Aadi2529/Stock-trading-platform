import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Summary from "./Summary";
import Orders from "./Orders";
import Watchlist from "./Watchlist";
import Holdings from "./Holdings";
import Positions from "./Positions";
import PortfolioSummary from "./PortfolioSummary";
import { useTradeRefresh } from "../hooks/useTradeRefresh";

const Dashboard = () => {
  const { refreshTrigger, triggerRefresh } = useTradeRefresh();

  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userId = params.get("userId");
    const username = params.get("username");

    if (token) localStorage.setItem("token", token);
    if (userId) localStorage.setItem("userId", userId);
    if (username) localStorage.setItem("username", username);

    if (userId || username) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          username: username,
        })
      );
    }

    // Clean URL after storing data
    if (window.location.search) {
      window.history.replaceState({}, document.title, "/");
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
        
        {/* TOP SUMMARY */}
        <PortfolioSummary refreshTrigger={refreshTrigger} />

        {/* ROUTED CONTENT */}
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
  );
};

export default Dashboard;