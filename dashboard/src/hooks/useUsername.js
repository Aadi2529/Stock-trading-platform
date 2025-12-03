import { useState, useEffect } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      console.log("📦 Reading user from localStorage:", stored);
      if (stored) {
        const u = JSON.parse(stored);
        const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || u.mobile;
        console.log("✅ Username resolved:", name);
        setUsername(name);
      } else {
        console.log("ℹ️ No user data in localStorage");
      }
    } catch (e) {
      console.warn("❌ Failed to read username from localStorage", e);
    }
  }, []);

  return username;
};
