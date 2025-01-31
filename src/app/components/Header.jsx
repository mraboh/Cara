'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Bell, Menu, X, Search, MenuIcon, FileText, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Link href="/">CaraShop</Link>
        </div>

        <form className={styles.searchBar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search size={20} />
          </button>
        </form>

        <nav className={styles.desktopNav}>
        <Link href="/" className={styles.iconLink}>
            <MenuIcon size={24} />
          </Link>
          <Link href="/commandes" className={styles.iconLink}>
            <FileText size={24} />
          </Link>
          <Link href="/register" className={styles.iconLink}>
            <User size={24} />
          </Link>
          <Link href="/panier" className={styles.iconLink}>
            <ShoppingCart size={24} />
          </Link>
          <Link href="/login" className={styles.loginButton}>
            Deconnecter
          </Link>
        </nav>

        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="/notifications" onClick={toggleMenu}>
          Notifications
        </Link>
        <Link href="/panier" onClick={toggleMenu}>
          Panier
        </Link>
        <Link href="/login" onClick={toggleMenu}>
          Se connecter
        </Link>
      </nav>

      <nav className={styles.categories}>
        <Link href="/category/chaussures">Chaussures</Link>
        <Link href="/category/vetements">Vêtements</Link>
        <Link href="/category/accessoires">Accessoires</Link>
        <Link href="/category/sport">Sport</Link>
        <Link href="/category/nouveautes">Nouveautés</Link>
      </nav>
    </header>
  );
}
