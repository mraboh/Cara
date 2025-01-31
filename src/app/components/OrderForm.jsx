'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './OrderForm.module.css';
import Image from 'next/image';

export default function OrderForm({ product, selectedSize, onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
    size: selectedSize
  });

  const basePrice = product.price[formData.size] ? parseInt(product.price[formData.size].replace('.', '')) : 0;
  const totalPrice = basePrice * formData.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setFormData(prev => ({
      ...prev,
      quantity: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Date de commande
    const orderDate = new Date();
    
    // Date de livraison (48h après la commande)
    const deliveryDate = new Date(orderDate.getTime() + (48 * 60 * 60 * 1000));
    
    const orderData = {
      ...formData,
      productName: product.title,
      productPrice: totalPrice,
      orderDate: orderDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      image: product.images[0],
      orderTime: Date.now(),
      status: 'en cours'
    };

    // Sauvegarder la commande
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Rediriger vers la page des commandes
    router.push('/commandes');
  };

  const getSizeOptions = () => {
    const isShoes = product.sizes[0].includes('-');
    if (isShoes) {
      const sizes = [];
      for (let i = 30; i <= 43; i++) {
        sizes.push(i.toString());
      }
      return sizes;
    } else {
      return ['S', 'M', 'L', 'XL', '2XL'];
    }
  };

  return (
    <>
      <div className={styles.formOverlay} onClick={onClose} />
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <div className={styles.productPreview}>
          {product.images && product.images[0] && (
            <div className={styles.imageContainer}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={100}
                height={100}
                objectFit="cover"
              />
            </div>
          )}
          <div className={styles.productInfo}>
            <h3>{product.title}</h3>
            <p className={styles.price}>{product.price[formData.size]} FCFA</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.sizeQuantityRow}>
            <div className={styles.formGroup}>
              <label htmlFor="size">Taille</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner</option>
                {getSizeOptions().map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="quantity">Quantité</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>
          </div>

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
            <label htmlFor="address">Adresse de livraison</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.totalPrice}>
            <span>Total:</span>
            <span className={styles.amount}>{totalPrice.toLocaleString()} FCFA</span>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            data-hover="Valider la commande"
          >
            Commander
          </button>
        </form>
      </div>
    </>
  );
}
