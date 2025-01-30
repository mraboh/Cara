'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const CommandesPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Récupérer la dernière commande du localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      const parsedOrder = JSON.parse(lastOrder);
      setOrders([parsedOrder, ...orders]);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <h1>Mes Commandes</h1>
      <div className={styles.orderList}>
        {orders.map((order, index) => (
          <div key={index} className={styles.order}>
            <div className={styles.orderHeader}>
              <h3>{order.productName}</h3>
              <span className={styles.status}>En cours</span>
            </div>
            <div className={styles.orderDetails}>
              <p>Date: {formatDate(order.orderDate)}</p>
              <p>Client: {order.name}</p>
              <p>Email: {order.email}</p>
              <p>Téléphone: {order.phone}</p>
              <p>Adresse: {order.address}</p>
              <p>Taille: {order.size}</p>
              <p className={styles.price}>Prix: {order.productPrice} FCFA</p>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className={styles.noOrders}>Aucune commande pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default CommandesPage;
