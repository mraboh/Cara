'use client';
import { useState } from 'react';
import styles from './OrderForm.module.css';
import { Loader2 } from 'lucide-react';

export default function OrderForm({ product, selectedSize, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    size: selectedSize || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOrderStatus('');

    // Simuler l'envoi de la commande
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        ...formData,
        productName: product.title,
        productPrice: product.price[selectedSize],
        orderDate: new Date().toISOString(),
      };

      // Ici vous pouvez ajouter la logique pour sauvegarder la commande
      // Par exemple, l'envoyer à une API ou la stocker localement

      setOrderStatus('success');
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      setTimeout(() => {
        onClose();
        // Rediriger vers la page des commandes
        window.location.href = '/commandes';
      }, 1500);
    } catch (error) {
      setOrderStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeOptions = () => {
    if (product.sizes[0].includes('-')) {
      // Pour les chaussures
      const sizes = [];
      for (let i = 22; i <= 43; i++) {
        sizes.push(i);
      }
      return sizes;
    } else {
      // Pour les vêtements
      return ['M', 'L', 'XL', '2XL'];
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        {isLoading && (
          <div className={styles.loadingScreen}>
            <Loader2 className={styles.spinner} />
            <p>Traitement de votre commande...</p>
          </div>
        )}

        {orderStatus === 'success' && (
          <div className={styles.successMessage}>
            Commande en cours
          </div>
        )}

        <h2 className={styles.title}>Formulaire de Commande</h2>
        
        <div className={styles.productInfo}>
          <h3>{product.title}</h3>
          <p className={styles.price}>{product.price[selectedSize]} FCFA</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Adresse de livraison</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="size">Taille</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une taille</option>
              {getSizeOptions().map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Traitement...' : 'Valider la commande'}
          </button>
        </form>
      </div>
    </div>
  );
}
