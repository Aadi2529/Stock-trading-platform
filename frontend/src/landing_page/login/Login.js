import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [loginType, setLoginType] = useState("email"); // "email" or "mobile"
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Synchronous validation
    const errors = {};
    if (!emailOrMobile) errors.emailOrMobile = "Email or mobile is required";
    else if (loginType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrMobile)) errors.emailOrMobile = "Invalid email address";
    } else {
      if (!/^\d{10}$/.test(emailOrMobile)) errors.emailOrMobile = "Mobile must be 10 digits";
    }
    if (!password) errors.password = "Password is required";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Please fix the highlighted errors before proceeding");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/login", {
        emailOrMobile,
        password,
      });

      // Centralize auth state
      login(response.data.token, response.data.user);

      if (rememberMe) {
        localStorage.setItem("rememberMe", emailOrMobile);
      }

      setSuccess("Login successful! Redirecting...");
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
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1 className="login-logo">Zerodha</h1>
          <p className="login-tagline">Invest in yourself</p>
        </div>

        <h2 className="login-title">Welcome Back</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="login-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${loginType === "email" ? "active" : ""}`}
            onClick={() => {
              setLoginType("email");
              setError("");
            }}
          >
            <i className="bi bi-envelope"></i> Email
          </button>
          <button
            type="button"
            className={`toggle-btn ${loginType === "mobile" ? "active" : ""}`}
            onClick={() => {
              setLoginType("mobile");
              setError("");
            }}
          >
            <i className="bi bi-telephone"></i> Mobile
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="emailOrMobile">
              {loginType === "email" ? "Email Address" : "Mobile Number"}
            </label>
            {loginType === "email" ? (
              <>
                <input
                  type="email"
                  id="emailOrMobile"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={emailOrMobile}
                  onChange={(e) => {
                    setEmailOrMobile(e.target.value);
                    setError("");
                    // live validate
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      if (!e.target.value) next.emailOrMobile = "Email or mobile is required";
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) next.emailOrMobile = "Invalid email address";
                      else delete next.emailOrMobile;
                      return next;
                    });
                  }}
                  required
                />
                {fieldErrors.emailOrMobile && (
                  <small className="field-error">{fieldErrors.emailOrMobile}</small>
                )}
              </>
            ) : (
              <div className="mobile-input">
                <span className="mobile-prefix">+91</span>
                <input
                  type="tel"
                  id="emailOrMobile"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  value={emailOrMobile}
                  onChange={(e) => {
                    setEmailOrMobile(e.target.value);
                    setError("");
                    setFieldErrors((prev) => {
                      const next = { ...prev };
                      if (!e.target.value) next.emailOrMobile = "Email or mobile is required";
                      else if (!/^\d{10}$/.test(e.target.value)) next.emailOrMobile = "Mobile must be 10 digits";
                      else delete next.emailOrMobile;
                      return next;
                    });
                  }}
                  maxLength="10"
                  required
                />
                {fieldErrors.emailOrMobile && (
                  <small className="field-error">{fieldErrors.emailOrMobile}</small>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (!e.target.value) next.password = "Password is required";
                  else delete next.password;
                  return next;
                });
              }}
              required
            />
            {fieldErrors.password && (
              <small className="field-error">{fieldErrors.password}</small>
            )}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-login"
            disabled={loading || Object.keys(fieldErrors).length > 0 || !emailOrMobile || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-divider">
          <span>New to Zerodha?</span>
        </div>

        <button
          type="button"
          className="btn btn-signup-link"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </button>

        <div className="login-security">
          <p>
            <i className="bi bi-shield-check"></i> We keep your password secure
          </p>
          <p>
            <i className="bi bi-lock"></i> Industry-leading security standards
          </p>
        </div>
      </div>

      <div className="login-features">
        <h3>Why Login to Zerodha?</h3>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-content">
              <h4>24/7 Access</h4>
              <p>Trade anytime, anywhere from your device</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div className="feature-content">
              <h4>Lower Brokerage</h4>
              <p>Flat ₹20 per trade for equities & ₹20 for F&O</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <h4>Smart Tools</h4>
              <p>Advanced charting and research tools</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <div className="feature-content">
              <h4>Award Winning</h4>
              <p>Trusted by over 1 crore investors</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-content">
              <h4>Real-time Data</h4>
              <p>Live market updates and alerts</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <div className="feature-content">
              <h4>Secure</h4>
              <p>Bank-grade security and encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
