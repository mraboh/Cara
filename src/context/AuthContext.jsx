// context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:4000/auth/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        error.message || "Une erreur est survenue lors de l'inscription"
      );
    }
  };
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:4000/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login response data:", data); // Add this to see the actual response

      // Store user data with all available fields
      const userData = {
        email: data.user?.email, // Use optional chaining in case data structure is nested
        firstName: data.user?.firstName,
        lastName: data.user?.lastName,
        token: data.token,
        // Add any other fields that come from your API
      };

      console.log("Stored user data:", userData); // Add this to verify what we're storing

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      return userData;
    } catch (error) {
      console.error("Login error:", error); // Add this to see any errors
      throw new Error(
        error.message || "Une erreur est survenue lors de la connexion"
      );
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Add any additional cleanup needed
  };

  const checkAuth = () => {
    return !!user;
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const value = {
    user,
    login,
    logout,
    checkAuth,
    updateUser,
    signup,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
