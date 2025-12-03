import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./SignUp.css";

const SignUp = () => {
  const [step, setStep] = useState(1); // 1: signup form, 2: OTP verification
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate inputs
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      // Send OTP first
      await axios.post("http://localhost:3002/sendOtp", {
        mobile: formData.mobile,
      });

      // For testing: fetch the last OTP from backend test endpoint
      try {
        const otpResponse = await axios.get("http://localhost:3002/testLastOtp");
        const generatedOtp = otpResponse.data.otp;
        console.log("🧪 TEST MODE: Generated OTP:", generatedOtp);
        // Show OTP in a non-production alert for testing
        setSuccess(`✅ OTP sent! (TEST: ${generatedOtp})`);
      } catch (err) {
        // If test endpoint not available, just show sent message
        setSuccess("✅ OTP sent to your mobile number");
      }

      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }

    try {
      // Verify OTP
      await axios.post("http://localhost:3002/verifyOtp", {
        mobile: formData.mobile,
        otp,
      });

      // Register user after OTP verification
      const response = await axios.post("http://localhost:3002/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      // Use central auth login so app state updates
      login(response.data.token, response.data.user);
      setSuccess("Sign up successful! Redirecting to dashboard...");
      // Redirect to external dashboard app with encoded user payload
      const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
      const userPayload = {
        id: response.data.user.id || response.data.user._id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        mobile: response.data.user.mobile,
        token: response.data.token,
      };
      const encoded = btoa(JSON.stringify(userPayload));
      window.location.href = `${dashboardUrl}/?u=${encoded}`;
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">
          {step === 1 ? "Create Your Account" : "Verify Your Mobile"}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {step === 1 ? (
          // Signup Form
          <form onSubmit={handleSignUp} className="signup-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number (10 digits) *</label>
              <div className="mobile-input">
                <span className="mobile-prefix">+91</span>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password (min 6 characters) *</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-signup"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="form-footer">
              Already have an account?{" "}
              <a href="/login" className="link">
                Login here
              </a>
            </p>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleVerifyOtp} className="signup-form">
            <div className="otp-info">
              <p>
                We've sent a 6-digit OTP to <strong>+91{formData.mobile}</strong>
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="otp">Enter OTP *</label>
              <input
                type="text"
                id="otp"
                className="form-control otp-input"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-signup"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Sign Up"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Back to Sign Up
            </button>

            <p className="resend-otp">
              Didn't receive OTP?{" "}
              <button
                type="button"
                className="link-button"
                onClick={handleSignUp}
                disabled={loading}
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}
      </div>

      <div className="signup-benefits">
        <h3>Why sign up with Zerodha?</h3>
        <ul>
          <li>🔒 Secure and encrypted transactions</li>
          <li>📱 Easy mobile number authentication</li>
          <li>💰 Access to exclusive trading features</li>
          <li>🎯 Real-time market updates and alerts</li>
          <li>📊 Advanced charting and analytics</li>
          <li>🏆 Award-winning platform trusted by millions</li>
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
