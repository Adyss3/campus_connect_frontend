import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Signup from '../pages/public/Signup';
import Welcome from '../pages/public/Welcome';

// Protected Pages
import Dashboard from '../pages/protected/Dashboard';
import Marketplace from '../pages/protected/Marketplace';
import ProductDetails from '../pages/protected/ProductDetails';
import Cart from '../pages/protected/Cart';
import Checkout from '../pages/protected/Checkout';
import Jobs from '../pages/protected/Jobs';
import JobDetails from '../pages/protected/JobDetails';
import ResumeBuilder from '../pages/protected/ResumeBuilder';
import Messages from '../pages/protected/Messages';
import Events from '../pages/protected/Events';
import Feed from '../pages/protected/Feed';
import Profile from '../pages/protected/Profile';
import Settings from '../pages/protected/Settings';
import Verification from '../pages/protected/Verification';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages Without Specific Layout */}
      <Route path="/" element={<Home />} />
      
      {/* Auth Layout for login/signup/welcome */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
      </Route>

      {/* Main Layout for protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/verification" element={<Verification />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
