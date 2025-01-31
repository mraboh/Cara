'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Trash2, Clock } from 'lucide-react';
import Header from '../components/Header';
import Image from 'next/image';

export default function CommandesPage() {
  const [orders, setOrders] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [elapsedTimes, setElapsedTimes] = useState({});

  useEffect(() => {
    // Charger les commandes au montage du composant
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    };

    loadOrders();
    // Actualiser les commandes toutes les secondes
    const interval = setInterval(loadOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mettre à jour les temps écoulés toutes les secondes
    const interval = setInterval(() => {
      const times = {};
      orders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const now = new Date();
        const elapsed = Math.floor((now - orderDate) / 1000); // en secondes
        times[order.orderTime] = formatElapsedTime(elapsed);
      });
      setElapsedTimes(times);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const formatElapsedTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours} heure${hours > 1 ? 's' : ''}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateRemainingTime = (deliveryDate) => {
    const now = new Date();
    const delivery = new Date(deliveryDate);
    const remaining = delivery - now;
    
    if (remaining <= 0) {
      return "Livraison en cours";
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}min restantes`;
  };

  const handleDeleteAll = () => {
    if (orders.length > 0) {
      setShowConfirmDelete(true);
      setOrderToDelete(null);
    }
  };

  const handleDeleteSingle = (order) => {
    setShowConfirmDelete(true);
    setOrderToDelete(order);
  };

  const confirmDelete = () => {
    if (orderToDelete === null) {
      localStorage.setItem('orders', '[]');
      setOrders([]);
    } else {
      const updatedOrders = orders.filter(o => o.orderTime !== orderToDelete.orderTime);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
    setShowConfirmDelete(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h1>Mes Commandes</h1>
        
        <div className={styles.banner}>
          <span className={styles.orderCount}>
            {orders.length} commande{orders.length !== 1 ? 's' : ''} 
          </span>
          <button 
            className={styles.deleteAllButton}
            onClick={handleDeleteAll}
            disabled={orders.length === 0}
          >
            <Trash2 size={18} />
            Supprimer toutes les commandes
          </button>
        </div>

        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.orderTime} className={styles.order}>
              <div className={styles.orderHeader}>
                <div className={styles.productImage}>
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.headerInfo}>
                  <h3>{order.productName}</h3>
                  <p className={styles.price}>{order.productPrice.toLocaleString()} FCFA</p>
                  <div className={styles.timeInfo}>
                    <Clock size={16} />
                    <span>Commandé il y a {elapsedTimes[order.orderTime]}</span>
                  </div>
                </div>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeleteSingle(order)}
                  title="Supprimer la commande"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className={styles.orderDetails}>
                <div className={styles.detailsSection}>
                  <h4>Informations client</h4>
                  <p><strong>Nom:</strong> {order.name}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Téléphone:</strong> {order.phone}</p>
                  <p><strong>Adresse:</strong> {order.address}</p>
                </div>

                <div className={styles.detailsSection}>
                  <h4>Détails commande</h4>
                  <p><strong>Taille:</strong> {order.size}</p>
                  <p><strong>Quantité:</strong> {order.quantity}</p>
                  <p><strong>Date de commande:</strong> {formatDate(order.orderDate)}</p>
                  <p><strong>Livraison prévue:</strong> {formatDate(order.deliveryDate)}</p>
                  <p className={styles.deliveryTime}>
                    <strong>Temps restant:</strong> {calculateRemainingTime(order.deliveryDate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className={styles.noOrders}>Aucune commande pour le moment</p>
          )}
        </div>
      </div>

      {showConfirmDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirmation</h2>
            <p>
              {orderToDelete === null 
                ? 'Voulez-vous vraiment supprimer toutes les commandes ?' 
                : 'Voulez-vous vraiment supprimer cette commande ?'
              }
            </p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.confirmButton}
                onClick={confirmDelete}
              >
                Confirmer
              </button>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowConfirmDelete(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
