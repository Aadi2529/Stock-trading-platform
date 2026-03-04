import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ChartProvider } from "./context/ChartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>

        <ChartProvider>

          <Toaster position="top-right" />

          <App />

        </ChartProvider>

      </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);