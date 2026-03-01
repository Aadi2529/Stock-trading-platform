import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, Link } from "react-router-dom";

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
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isWatchlist = location.pathname === "/watchlist";

  /* ================= AUTH ================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tokenFromUrl = params.get("token");
    const userIdFromUrl = params.get("userId");
    const usernameFromUrl = params.get("username");
    const emailFromUrl = params.get("email");

    if (tokenFromUrl) localStorage.setItem("token", tokenFromUrl);

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
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden lg:block w-72 border-r border-gray-800 bg-[#111827]">
        <Watchlist onTradeComplete={triggerRefresh} />
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= MOBILE TOP NAV ================= */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-800">
          <Link
            to="/"
            className={`text-sm ${isHome ? "text-blue-400" : "text-gray-400"}`}
          >
            Summary
          </Link>

          <Link
            to="/watchlist"
            className={`text-sm ${isWatchlist ? "text-blue-400" : "text-gray-400"}`}
          >
            Watchlist
          </Link>

          <Link
            to="/orders"
            className="text-sm text-gray-400"
          >
            Orders
          </Link>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <PortfolioSummary refreshTrigger={refreshTrigger} />
                  <Summary />
                </>
              }
            />

            {/* Mobile Watchlist Page */}
            <Route
              path="/watchlist"
              element={
                <Watchlist onTradeComplete={triggerRefresh} />
              }
            />

            <Route
              path="orders"
              element={<Orders refreshTrigger={refreshTrigger} />}
            />

            <Route
              path="holdings"
              element={<Holdings refreshTrigger={refreshTrigger} />}
            />

            <Route
              path="positions"
              element={<Positions />}
            />

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