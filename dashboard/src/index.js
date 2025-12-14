import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import './styles/responsive.css';
import Home from "./components/Home";

// If redirected from frontend with user payload in query (param `u`), decode and save to localStorage
try {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("u");
  if (encoded) {
    try {
      const decoded = JSON.parse(atob(encoded));
      console.log("✅ Decoded user from query param:", decoded);
      // Save under `user` so dashboard can read it
      localStorage.setItem("user", JSON.stringify(decoded));
      // Also save JWT token if provided so dashboard can call protected APIs
      if (decoded.token) {
        localStorage.setItem("token", decoded.token);
        console.log("✅ Token saved to localStorage");
      }
      // Remove query param from URL for cleanliness
      const url = new URL(window.location.href);
      url.searchParams.delete("u");
      window.history.replaceState({}, document.title, url.pathname + url.search);
      console.log("✅ Query param removed from URL");
    } catch (err) {
      console.warn("❌ Failed to decode dashboard user param", err);
    }
  } else {
    console.log("ℹ️ No 'u' query param found");
  }
} catch (e) {
  console.error("❌ Error processing startup params:", e);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
