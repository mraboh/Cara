'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Récupérer l'utilisateur enregistré
      const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
      
      if (!registeredUser.email || registeredUser.email !== email || registeredUser.password !== password) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Créer l'objet utilisateur
      const user = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName
      };

      // Sauvegarder l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}
