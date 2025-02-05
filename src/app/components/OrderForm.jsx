'use client';
import { useState } from 'react';
import styles from './OrderForm.module.css';
import { X } from 'lucide-react';
import useOrderStore from '../store/orderStore';
import { useRouter } from 'next/navigation';

export default function OrderForm({ product, selectedSize, onClose }) {
  const router = useRouter();
  const { addOrder, addNotification } = useOrderStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
    color: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créer la commande
    const order = {
      ...formData,
      product,
      selectedSize,
      totalPrice: product.price[selectedSize] * formData.quantity,
    };
    
    // Ajouter la commande au store
    addOrder(order);
    
    // Créer une notification pour la livraison
    setTimeout(() => {
      addNotification({
        message: `Votre commande de ${product.title} a été expédiée !`,
        type: 'success',
        timestamp: new Date()
      });
    }, 3600000); // 1 heure
    
    // Fermer le modal et rediriger vers la page des commandes
    onClose();
    router.push('/commandes');
  };

  const totalPrice = product.price[selectedSize] * formData.quantity;

  return (
    <div className={styles.formContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
      
      <h2>Formulaire de Commande: {product.title}</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Votre nom</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="color">Modele souhaité</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Ex: Rouge, Bleu, Noir..."
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
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.summary}>
          <p>Taille sélectionnée: {selectedSize}</p>
          <p>Prix unitaire: {product.price[selectedSize]} fcfa</p>
          <p className={styles.total}>Total: {totalPrice} 000 fcfa</p>
        </div>

        <button type="submit" className={styles.submitButton}>
          Valider la commande
        </button>
      </form>
    </div>
  );
}
