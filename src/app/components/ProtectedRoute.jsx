'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà sur la page de connexion
    const isLoginPage = window.location.pathname === '/login';
    
    if (!loading) {
      if (!user && !isLoginPage) {
        // Rediriger vers la page de connexion si non connecté
        router.push('/login');
      } else if (user && isLoginPage) {
        // Rediriger vers la page d'accueil si déjà connecté
        router.push('/');
      }
    }
  }, [user, loading, router]);

  // Afficher un écran de chargement pendant la vérification
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  // Vérifier si on est sur la page de connexion
  const isLoginPage = window.location.pathname === '/login';

  // Si non connecté et pas sur la page de connexion, ne rien afficher
  if (!user && !isLoginPage) {
    return null;
  }

  // Si connecté et sur la page de connexion, ne rien afficher
  if (user && isLoginPage) {
    return null;
  }

  // Sinon, afficher le contenu
  return children;
}
