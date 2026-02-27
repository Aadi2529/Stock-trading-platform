import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDisplay, setUserDisplay] = useState("U");

  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userObj = null;

    if (storedUser) {
      try {
        userObj = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user object:", e);
      }
    }

    // Fallback
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    if (FRONTEND_URL) {
      window.location.href = `${FRONTEND_URL}/login`;
    } else {
      window.location.href = "/";
    }
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
        <img src="/logo.png" alt="TradeNova Logo" className="w-10" />
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