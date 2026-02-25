import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setMobileOpen(false);
    navigate("/");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Trading", path: "/trading" },
    { name: "Services", path: "/services" },
    { name: "Support", path: "/support" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md text-gray-800"
          : "bg-gradient-to-r from-[#1a0000] via-[#300000] to-[#1a0000] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-xl font-bold tracking-wide cursor-pointer"
          >
            TradeNova
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-red-500 font-semibold"
                      : scrolled
                      ? "hover:text-red-500"
                      : "hover:text-red-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">

            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition">
              <Globe size={18} />
              <span>EN</span>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">

                <button
                  onClick={handleDashboard}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    scrolled
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    scrolled
                      ? "border border-gray-300 hover:bg-gray-100"
                      : "border border-white/30 hover:text-red-400"
                  }`}
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            ) : (
              <NavLink
                to="/login"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                  scrolled
                    ? "border border-gray-300 hover:bg-gray-100"
                    : "border border-white/30 hover:bg-red-600"
                }`}
              >
                <User size={16} />
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden ${
            scrolled
              ? "bg-white text-gray-800"
              : "bg-[#200000] text-white"
          } transition-all duration-500 py-6`}
        >
          <div className="flex flex-col space-y-4 px-6">

            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="hover:text-red-500 transition"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="border-t border-gray-400 mt-4 pt-4">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      handleDashboard();
                      setMobileOpen(false);
                    }}
                    className="bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Go to Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 text-red-500 hover:text-red-400"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={16} />
                  Login
                </NavLink>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;