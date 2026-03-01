import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userDisplay, setUserDisplay] = useState("U");

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      setUserName(username);
      setUserDisplay(username.substring(0, 2).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    // Redirect back to main frontend login
    window.location.href =
      "https://trade-nova-eight.vercel.app/login";
  };

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
  ];

  return (
    <div className="w-full flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">
        {/* <img src="/logo.png" alt="TradeNova Logo" className="w-10" /> */}
                  <div
            onClick={() => navigate("/")}
            className="text-xl font-bold tracking-wide cursor-pointer"
          >
            TradeNova
          </div>
      </div>

      {/* Menu Items */}
      <div className="flex items-center gap-8">

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

        {/* Profile */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="w-10 h-10 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full font-semibold">
              {userDisplay}
            </div>
            <p className="text-sm text-gray-300">{userName}</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm text-gray-400">
                  Logged in as {userName}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Menu;