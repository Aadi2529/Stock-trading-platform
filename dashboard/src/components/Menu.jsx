import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userDisplay, setUserDisplay] = useState("U");

  const dropdownRef = useRef(null);
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userObj = null;

    if (storedUser) {
      try {
        userObj = JSON.parse(storedUser);
      } catch {}
    }

    if (!userObj) {
      const username = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      if (username || email) {
        userObj = { username, email };
      }
    }

    if (userObj) {
      const name = userObj.username || userObj.email || "User";
      setUserName(name);
      setUserDisplay(name.substring(0, 2).toUpperCase());
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href =
      FRONTEND_URL || "https://trade-nova-eight.vercel.app";
  };

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
  ];

  return (
    <div className="flex items-center gap-6 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src="/logo.png"
          alt="TradeNova Logo"
          className="w-8 sm:w-9 md:w-10 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="hidden sm:block text-sm font-semibold text-white tracking-wide">
          TradeNova
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium transition duration-200 ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        <div className="h-6 w-px bg-gray-700"></div>

        {/* Desktop Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-800/60 px-3 py-2 rounded-lg transition"
          >
            <div className="w-9 h-9 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
              {userDisplay}
            </div>
            <p className="text-sm text-gray-300">{userName}</p>
          </div>

          <div
            className={`absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-xl transition-all duration-200 ${
              isProfileDropdownOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm text-gray-200 truncate">{userName}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden text-gray-400 hover:text-white transition ml-auto"
      >
        ☰
      </button>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="absolute top-14 right-0 bg-gray-900 border border-gray-700 rounded-xl shadow-xl w-64 p-5 md:hidden">
          {/* Profile inside mobile */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
            <div className="w-9 h-9 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
              {userDisplay}
            </div>
            <div>
              <p className="text-sm text-gray-200">{userName}</p>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="mt-4 space-y-3">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className="block text-sm text-gray-300 hover:text-white transition"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
