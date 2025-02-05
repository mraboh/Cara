"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/context/NotificationContext";

import styles from "./page.module.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
  });
  const BUSINESS_LOCATION = {
    lat: 4.0682, // Deido, Douala coordinates
    lng: 9.7006,
  };
  const formatPrice = (price) => {
    // Format the price without adding extra zeros
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Calculate delivery time based on distance
  const calculateDeliveryTime = (distance) => {
    // Base time: 30 minutes
    // Add 5 minutes for each kilometer
    const baseTime = 30;
    const timePerKm = 5;
    const estimatedTime = Math.round(baseTime + distance * timePerKm);

    // Ensure time is between 45-60 minutes
    return Math.min(Math.max(estimatedTime, 45), 60);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get user's location
      const userLocation = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              // If geolocation fails, use a default location
              resolve({
                lat: 5.3396,
                lng: -4.0271,
              });
            }
          );
        } else {
          resolve({
            lat: 5.3396,
            lng: -4.0271,
          });
        }
      });

      // Calculate distance
      const calculatedDistance = calculateDistance(
        BUSINESS_LOCATION.lat,
        BUSINESS_LOCATION.lng,
        userLocation.lat,
        userLocation.lng
      );
      setDistance(calculatedDistance);

      // Calculate delivery time based on distance
      const deliveryTime = calculateDeliveryTime(calculatedDistance);

      // Calculate delivery fee based on distance
      const deliveryFee = 0;

      // Create order object
      const order = {
        ...formData,
        items: cart,
        subtotal: getCartTotal(),
        deliveryFee,
        total: getCartTotal(),
        deliveryTime,
        distance: calculatedDistance.toFixed(2),
        orderDate: new Date().toISOString(),
        status: "pending",
        location: userLocation,
      };

      // Simulate order processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In your handleSubmit function, modify the addNotification call:
      addNotification({
        title: "Nouvelle commande",
        message: `Votre commande sera livrée dans environ ${deliveryTime} minutes (Distance: ${calculatedDistance.toFixed(
          2
        )} km).
Total: ${formatPrice(order.total)},000 FCFA`, // Remove the + 1000 and ,000
        type: "success",
        timestamp: new Date().toISOString(),
      });

      // Show success modal
      setShowSuccessModal(true);

      // Clear cart
      clearCart();

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error processing order:", error);
      addNotification({
        title: "Erreur",
        message: "Une erreur est survenue lors du traitement de votre commande",
        type: "error",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <ProtectedRoute>
      <div className={styles.checkoutContainer}>
        <Link href="/panier" className={styles.backLink}>
          <ArrowLeft size={20} />
          Retour au panier
        </Link>

        <div className={styles.checkoutContent}>
          <div className={styles.formSection}>
            <h1>Informations de livraison</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup + " " + styles.fullWidth}>
                  <label htmlFor="address">Adresse de livraison</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup + " " + styles.fullWidth}>
                  <label htmlFor="additionalInfo">
                    Informations supplémentaires
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className={styles.orderSummary}>
            <h2>Récapitulatif de la commande</h2>
            <div className={styles.orderItems}>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  className={styles.orderItem}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h3>{item.title}</h3>
                    <p>Taille: {item.selectedSize}</p>
                    <p>Quantité: {item.quantity}</p>
                    <p>{formatPrice(item.price * item.quantity)},000 FCFA</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderTotal}>
              <div className={styles.totalRow}>
                <span>Sous-total</span>
                <span>{formatPrice(getCartTotal())},000 FCFA</span>
              </div>
              <div className={styles.totalRow}>
                <span>Livraison</span>
                <span>
                  {distance
                    ? `${formatPrice(
                        Math.round(distance * 500)
                      )},000 FCFA (${distance.toFixed(2)} km)`
                    : "Calculé à la confirmation"}
                </span>
              </div>
              <div className={styles.totalRow + " " + styles.finalTotal}>
                <span>Total</span>
                <span>
                  {distance
                    ? `${formatPrice(
                        getCartTotal() + Math.round(distance * 500)
                      )},000 FCFA`
                    : `${formatPrice(getCartTotal())},000 FCFA`}
                </span>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Traitement en cours..." : "Confirmer la commande"}
              </button>
            </div>

            {showSuccessModal && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Commande Confirmée!</h2>
                  <p>Votre commande a été traitée avec succès.</p>
                  {distance && (
                    <p>Distance de livraison: {distance.toFixed(2)} km</p>
                  )}
                  <p>Un livreur vous contactera bientôt.</p>
                  <p>Redirection vers la page d'accueil...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
