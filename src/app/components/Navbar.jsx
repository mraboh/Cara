'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        CaraShop
      </Link>

      {/* <div className={styles.navLinks}>
        {user ? (
          <>
            <span className={styles.welcome}>
              Bienvenue, {user.firstName}
            </span>
            <button onClick={logout} className={styles.logoutButton}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            Connexion
          </Link>
        )}
      </div> */}
    </nav>
  );
}
