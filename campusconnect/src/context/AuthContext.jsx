import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means unauthenticated
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ id: 1, name: 'Student Admin', email: email, role: 'Student' });
    setIsLoading(false);
  };

  const signup = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ id: 1, ...userData });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
