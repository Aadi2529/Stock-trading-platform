import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from './landing_page/home/HomePage';
import SignUp from './landing_page/signup/SignUp';
import Login from './landing_page/login/Login';
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import SupportTopic from './landing_page/support/pages/SupportTopic';
import ProductPage from './landing_page/products/ProductPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Dashboard component (to be used with PrivateRoute)
// const DashboardPlaceholder = () => (
//   <div style={{ padding: '20px', textAlign: 'center' }}>
//     <h1>Dashboard - Protected Route</h1>
//     <p>Only authenticated users can see this page</p>
//   </div>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/topic/:catId/:topicSlug" element={<SupportTopic />} />
        <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);