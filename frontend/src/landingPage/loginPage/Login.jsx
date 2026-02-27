import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = inputValue;

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
      console.error("VITE_BACKEND_URL is missing");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/login`,
        inputValue,
        { withCredentials: true }
      );

      const { success, message, token, user } = response.data;

      if (!success) {
        toast.error(message || "Login failed");
        setLoading(false);
        return;
      }

      toast.success(message || "Login successful");

      // Store basic data locally (optional but useful)
      if (user) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
      }

      const redirectUrl =
        DASHBOARD_URL || "http://localhost:5174";

      const queryParams = `?token=${token}&userId=${user?.id}&username=${encodeURIComponent(user?.username || "")}`;

      setTimeout(() => {
        window.location.href = `${redirectUrl}${queryParams}`;
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8fafc] pt-24 pb-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Login to your trading account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email address
            </label>
            <input
              name="email"
              value={email}
              onChange={handleOnChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                value={password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;