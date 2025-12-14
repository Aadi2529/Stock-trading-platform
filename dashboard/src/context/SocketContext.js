import React, { createContext, useEffect, useState } from "react";

// NOTE: We avoid a static import for `socket.io-client` so the dashboard can
// compile even if the dependency isn't installed. We dynamically load the
// client (local package if available, otherwise fall back to CDN script).

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let s = null;

    const loadSocketClient = async () => {
      // Prefer built package (if installed) using dynamic import
      try {
        const pkg = await import("socket.io-client");
        return pkg.io || pkg.default || pkg;
      } catch (err) {
        console.warn("socket.io-client not installed locally; falling back to CDN");

        const cdnSrc = "https://cdn.socket.io/4.8.1/socket.io.min.js";
        if (!document.querySelector(`script[src='${cdnSrc}']`)) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = cdnSrc;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load socket.io-client from CDN"));
            document.head.appendChild(script);
          });
        }

        if (window && window.io) return window.io;
        throw new Error("socket.io-client unavailable");
      }
    };

    const connectWithToken = async (tokenValue) => {
      try {
        const ioLib = await loadSocketClient();
        if (!ioLib) return;

        // Disconnect previous socket
        if (s) {
          try {
            s.disconnect();
          } catch (e) {}
        }

        const createSocket = ioLib.io || ioLib.default || ioLib;
        s = createSocket("http://localhost:3002", {
          transports: ["websocket", "polling"],
          auth: { token: tokenValue },
          autoConnect: true,
        });

        setSocket(s);

        s.on("connect", () => {
          console.log("Socket connected ->", s.id);
        });

        s.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      } catch (err) {
        console.warn("Socket connect failed:", err.message);
      }
    };

    // initial connect
    connectWithToken(localStorage.getItem("token"));

    // When token changes in other tabs or after login, reconnect socket with new token
    const onStorage = (e) => {
      if (e.key === "token") {
        connectWithToken(e.newValue);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      if (s) s.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketContext;
