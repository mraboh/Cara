'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { Bell, Search, User, Plus, ShoppingCart, LogOut, Box, X } from 'lucide-react';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.jpg" alt="CaraShop Logo" />
        </Link>

        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setShowResults(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <button className={styles.searchButton}>
              <Search size={20} />
            </button>
          </div>

          {showResults && searchQuery && (
            <div className={styles.searchResults}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/detail/${product.id}`}
                    className={styles.searchResultItem}
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className={styles.resultImage}
                    />
                    <div className={styles.resultInfo}>
                      <h4>{product.title}</h4>
                      <p>{product.price[Object.keys(product.price)[0]]} FCFA</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className={styles.noResults}>
                  Aucun produit trouvé
                </div>
              )}
            </div>
          )}
        </div>

        <nav className={styles.desktopNav}>
          {user ? (
            <>
              <Link href="/notification" className={styles.iconLink}>
                <Bell size={24} />
                <span className={styles.iconLabel}>Notifications</span>
              </Link>
              
              <div className={styles.userMenuContainer}>
                <button 
                  className={styles.userButton}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className={styles.userAvatar}>
                    {user && user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className={styles.iconLabel}>Compte</span>
                </button>
                
                {showDropdown && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatarLarge}>
                        {user && user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>
                          {user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}
                        </span>
                        <span className={styles.userEmail}>
                          {user ? user.email : ''}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.dropdownMenu}>
                      <Link href="/collection" className={styles.dropdownItem} onClick={() => setShowDropdown(false)}>
                        <Plus size={18} />
                        <span>Ajouter une collection</span>
                      </Link>
                      <button 
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/commandes" className={styles.iconLink}>
                <Box size={24} />
                <span className={styles.iconLabel}>Commandes</span>
              </Link>
              <Link href="/panier" className={styles.iconLink}>
                <ShoppingCart size={24} />
                <span className={styles.iconLabel}>Panier</span>
              </Link>
            </>
          ) : (
            <Link href="/login" className={styles.iconLink}>
              <User size={24} />
              <span className={styles.iconLabel}>Connexion</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
