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
import StudentLogin from '../pages/public/StudentLogin';
import StudentSignup from '../pages/public/StudentSignup';
import CampusLogin from '../pages/public/CampusLogin';
import CampusSignup from '../pages/public/CampusSignup';

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

// Store Pages
import StoreDirectory from '../pages/protected/StoreDirectory';
import StoreProfile from '../pages/protected/StoreProfile';
import CreateStore from '../pages/protected/CreateStore';
import EditStore from '../pages/protected/EditStore';
import StoreDashboard from '../pages/protected/StoreDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Home Page */}
      <Route path="/" element={<Home />} />
      
      {/* Auth Layout for login/signup */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/login/campus" element={<CampusLogin />} />
        <Route path="/signup/campus" element={<CampusSignup />} />
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
          
          {/* Store System Pages */}
          <Route path="/stores" element={<StoreDirectory />} />
          <Route path="/store/:id" element={<StoreProfile />} />
          <Route path="/store/create" element={<CreateStore />} />
          <Route path="/store/edit" element={<EditStore />} />
          <Route path="/store/dashboard" element={<StoreDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;