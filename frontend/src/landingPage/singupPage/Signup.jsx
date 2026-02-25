import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const Signup = () => {
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
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:4000/signup",
      inputValue
    );

    console.log(response.data);

    if (!response.data.token) {
      toast.error(response.data.message || "Signup failed");
      setLoading(false);
      return;
    }

    toast.success(response.data.message);

    const dashboardUrl =
      import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5174";

    // Redirect with token and user data
    const user = response.data.user;
    const userParam = user ? `&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}&userId=${user.id}` : "";
    setTimeout(() => {
      window.location.href = `${dashboardUrl}?token=${response.data.token}${userParam}`;
    }, 1000);

  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Signup failed");
  }

  setLoading(false);
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="username"
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={handleOnChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleOnChange}
              className="w-full border p-3 rounded"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Signup;
