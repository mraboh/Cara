"use client";
import { useState, useEffect } from "react";
import styles from "./panier.module.css";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function PanierPage() {
  const router = useRouter(); // Add this
  // ... other existing code ...

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity, item.selectedSize);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  if (!isClient) {
    return null; // Prevent hydration issues
  }

  return (
    <ProtectedRoute>
      <div className={`mt-10 ${styles.pageContainer}`}>
        <div className={styles.container}>
          <h1>Mon Panier</h1>

          {cart.length === 0 ? (
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
              <div className={styles.cartItems}>
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className={styles.cartItem}
                  >
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.title} />
                    </div>

                    <div className={styles.itemDetails}>
                      <h3>{item.title}</h3>
                      {item.selectedSize && (
                        <p className={styles.itemSize}>
                          Taille: {item.selectedSize}
                        </p>
                      )}
                      <p className={styles.itemPrice}>
                        {formatPrice(item.price)},000 FCFA
                      </p>
                    </div>

                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className={styles.quantityButton}
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className={styles.quantityButton}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className={styles.itemTotal}>
                      {formatPrice(item.price * item.quantity)},000 FCFA
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item)}
                      className={styles.removeButton}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.cartSummary}>
                <h2>Récapitulatif</h2>
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Sous-total</span>
                    <span>{formatPrice(getCartTotal())},000 FCFA</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Livraison</span>
                    <span>Calculé à la prochaine étape</span>
                  </div>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())},000 FCFA</span>
                </div>

                <div className={styles.cartActions}>
                  <button
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                  >
                    Passer la commande
                  </button>
                  <button
                    className={styles.clearCartButton}
                    onClick={clearCart}
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
