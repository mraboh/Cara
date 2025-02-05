"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import {
  Bell,
  Search,
  User,
  Plus,
  ShoppingCart,
  LogOut,
  Box,
  X,
  Trash2,
  Check, // Add this if not already imported
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

export default function Header() {
  const {
    notifications,
    removeNotification,
    markAsRead,
    clearAll,
    unreadCount,
  } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "À l'instant";
    if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Il y a ${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString();
  };

  const { cartCount } = useCart();
  const router = useRouter();
  const { user, login, logout, checkAuth } = useAuth();
  console.log(user);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const formatNotificationMessage = (message) => {
    const lines = message.split("\n").filter((line) => line.trim());
    return (
      <div className={styles.messageContent}>
        {lines.map((line, index) => {
          const [label, value] = line.split(":").map((str) => str.trim());
          return (
            <div key={index} className={styles.messageDetail}>
              <span className={styles.messageLabel}>{label}:</span>
              <span className={styles.messageValue}>{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const getUserInitial = () => {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/");
  };

  const filteredProducts = products.filter(
    (product) =>
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
                      setSearchQuery("");
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
                <div className={styles.noResults}>Aucun produit trouvé</div>
              )}
            </div>
          )}
        </div>
        <nav className={styles.desktopNav}>
          {user ? (
            <>
              <div className={styles.notificationContainer} ref={dropdownRef}>
                <button
                  className={styles.iconButton}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className={styles.bellIcon} />
                  {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className={styles.dropdown}>
                    <div className={styles.header}>
                      <h3>Notifications</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearAll}
                          className={styles.clearButton}
                        >
                          <Trash2 size={16} />
                          Tout effacer
                        </button>
                      )}
                    </div>

                    <div className={styles.notificationList}>
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`${styles.notification} ${
                              notif.read ? styles.read : ""
                            }`}
                          >
                            <div className={styles.notificationContent}>
                              <div className={styles.notificationHeader}>
                                <h4>{notif.title}</h4>
                                <span className={styles.timestamp}>
                                  {formatTimestamp(notif.timestamp)}
                                </span>
                              </div>
                              <p>
                                {typeof notif.message === "string"
                                  ? formatNotificationMessage(notif.message)
                                  : notif.message}
                              </p>
                            </div>
                            <div className={styles.actions}>
                              {!notif.read && (
                                <button
                                  onClick={() => markAsRead(notif.id)}
                                  className={styles.actionButton}
                                  title="Marquer comme lu"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => removeNotification(notif.id)}
                                className={styles.actionButton}
                                title="Supprimer"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.emptyState}>
                          Aucune notification
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.userMenuContainer}>
                <button
                  className={styles.userButton}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className={styles.userAvatar}>{getUserInitial()}</div>
                  <span className={styles.iconLabel}>Compte</span>
                </button>

                {showDropdown && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatarLarge}>
                        {getUserInitial()}
                      </div>
                      <div className={styles.userDetails}>
                        <span className={styles.userName}>
                          {user.name || "Utilisateur"}
                        </span>
                        <span className={styles.userEmail}>{user.email}</span>
                      </div>
                    </div>

                    <div className={styles.dropdownMenu}>
                      <Link
                        href="/collection"
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        <Plus size={18} />
                        <span>Ajouter une collection</span>
                      </Link>
                      <button className={styles.dropdownItem} onClick={logout}>
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
                <div className={styles.cartIconWrapper}>
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className={styles.cartCount}>{cartCount}</span>
                  )}
                </div>
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
