'use client';
import { useState, useEffect } from 'react';
import styles from './panier.module.css';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PanierPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <h1>Mon Panier</h1>

          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingBag size={100} className={styles.emptyCartIcon} />
              <p>Votre panier est vide</p>
              <Link href="/" className={styles.viewProductsButton}>
                <ArrowLeft size={20} className={styles.arrowIcon} />
                Voir les produits
              </Link>
            </div>
          ) : (
            <div className={styles.cartContent}>
              {/* Liste des articles */}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}