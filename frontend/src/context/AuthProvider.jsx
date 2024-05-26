import React, { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(["userId", "token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (cookies.token && cookies.userId) {
      setIsAuthenticated(true);
    }
  }, [cookies]);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
