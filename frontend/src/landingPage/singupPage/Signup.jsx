import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!BACKEND_URL) {
      toast.error("Backend URL not configured");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, inputValue, {
        withCredentials: true,
      });

      const { success, message, token, user } = response.data;

      if (!success || !token) {
        toast.error(message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success(message || "Account created successfully");

      // Store locally
      if (user) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
      }

      /* ============================
         SAFE PRODUCTION REDIRECT
      ============================ */

      let baseUrl = DASHBOARD_URL;

      // fallback if env missing
      if (!baseUrl) {
        baseUrl = "http://localhost:5174";
      }

      // ensure https prefix
      if (!baseUrl.startsWith("http")) {
        baseUrl = `https://${baseUrl}`;
      }

      const redirectUrl = new URL(baseUrl);

      redirectUrl.searchParams.set("token", token);
      redirectUrl.searchParams.set("userId", user?.id);
      redirectUrl.searchParams.set("username", user?.username || "");

      setTimeout(() => {
        const dashboardBase = "https://trade-nova-dashboard.vercel.app";

        const finalUrl = `${dashboardBase}?token=${token}&userId=${user?.id}&username=${encodeURIComponent(user?.username || "")}`;

        window.open(finalUrl, "_blank"); // open in new tab
        
        // optionally stay on home page or redirect to login/home
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err?.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8fafc] pt-24 pb-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={handleOnChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleOnChange}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
