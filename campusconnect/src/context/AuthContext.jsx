import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Force refresh localStorage data with updated images
  useEffect(() => {
    const currentVersion = '2.0'; // Update this when we change mockData
    const storedVersion = localStorage.getItem('cc_data_version');
    
    if (storedVersion !== currentVersion) {
      // Clear old data and reseed with updated mockData
      localStorage.removeItem('cc_users');
      localStorage.removeItem('cc_stores');
      localStorage.removeItem('cc_products');
      localStorage.removeItem('cc_jobs');
      localStorage.removeItem('cc_events');
      localStorage.setItem('cc_data_version', currentVersion);
    }
    
    if (!localStorage.getItem('cc_users')) {
      localStorage.setItem('cc_users', JSON.stringify(seedUsers));
    }
  }, []);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cc_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Helper to query all users
  const getUsers = () => {
    const data = localStorage.getItem('cc_users');
    return data ? JSON.parse(data) : seedUsers;
  };

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const usersList = getUsers();
    const foundUser = usersList.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setIsLoading(false);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('cc_current_user', JSON.stringify(foundUser));
      return foundUser;
    } else {
      throw new Error('Invalid email or password.');
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const usersList = getUsers();
    const emailExists = usersList.some(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (emailExists) {
      setIsLoading(false);
      throw new Error('An account with this email already exists.');
    }

    // Role and Validation logic
    let finalRole = userData.role || 'Student';
    let finalAccountType = userData.accountType || 'Student';
    let isVerifiedStudent = false;

    if (userData.isStudentPortal) {
      // Validate MTU email with strict pattern: firstnamelastname@mtu.edu.ng
      const mtuEmailPattern = /^[a-z]+[a-z]+@mtu\.edu\.ng$/i;
      const isMtuEmail = mtuEmailPattern.test(userData.email.toLowerCase());
      if (!isMtuEmail) {
        setIsLoading(false);
        throw new Error('Please use a valid MTU student email format: firstnamelastname@mtu.edu.ng');
      }
      finalRole = 'Student';
      finalAccountType = 'Student';
      isVerifiedStudent = true;
    } else {
      // Campus portal signup
      finalRole = userData.role; // Entrepreneur, Staff, Organization
      finalAccountType = userData.role; // e.g. Entrepreneur, Staff, Organization
    }

    const newUser = {
      id: 'u_' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName || '',
      email: userData.email,
      password: userData.password,
      role: finalRole,
      accountType: finalAccountType,
      isVerifiedStudent,
      hasStore: false,
      storeId: null,
      university: userData.university || 'Mountain Top University',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...usersList, newUser];
    localStorage.setItem('cc_users', JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem('cc_current_user', JSON.stringify(newUser));

    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cc_current_user');
  };

  // Helper to dynamically upgrade student to entrepreneur when creating a store
  const registerStoreForUser = (userId, storeId) => {
    const usersList = getUsers();
    const updatedUsers = usersList.map(u => {
      if (u.id === userId) {
        return { ...u, hasStore: true, storeId };
      }
      return u;
    });

    localStorage.setItem('cc_users', JSON.stringify(updatedUsers));

    // Update current user if it matches
    if (user && user.id === userId) {
      const updatedCurrentUser = { ...user, hasStore: true, storeId };
      setUser(updatedCurrentUser);
      localStorage.setItem('cc_current_user', JSON.stringify(updatedCurrentUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, registerStoreForUser }}>
      {children}
    </AuthContext.Provider>
  );
};

