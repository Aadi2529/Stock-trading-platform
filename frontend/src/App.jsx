import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./landingPage/home/HomePage";
import AboutPage from "./landingPage/about/AboutPage";
import SupportPage from "./landingPage/support/SupportPage";
import PricingPage from "./landingPage/pricing/PricingPage";
import Trading from "./landingPage/Trading/Trading";
import Services from "./landingPage/Services/Services";
import Login from "./landingPage/loginPage/Login";
import Signup from "./landingPage/singupPage/Signup";

import Nav from "./landingPage/Navbar";
import Footer from "./landingPage/Footer";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./landingPage/NotFound";

function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;