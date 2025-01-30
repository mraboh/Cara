'use client';
import { useState, useEffect } from 'react';
import styles from './panier.module.css';
import { Trash2, Plus, Minus, Upload } from 'lucide-react';
import Image from 'next/image';

export default function PanierPage() {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    quantity: 1,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Charger les articles du panier depuis le localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les articles dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      const newCartItem = {
        ...newItem,
        id: Date.now(),
        image: imagePreview // Sauvegarder l'URL de l'image en base64
      };
      setCartItems([...cartItems, newCartItem]);
      setNewItem({ name: '', description: '', price: '', quantity: 1, image: null });
      setImagePreview(null);
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={styles.container}>
      <h1>Mon Panier</h1>

      {/* Formulaire d'ajout */}
      <div className={styles.addItemForm}>
        <h2>Ajouter un article</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom du produit</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Prix (€)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image</label>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              <label htmlFor="image" className={styles.uploadButton}>
                <Upload size={20} />
                Choisir une image
              </label>
            </div>
            {imagePreview && (
              <div className={styles.imagePreview}>
                <Image
                  src={imagePreview}
                  alt="Aperçu"
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
            )}
          </div>

          <button type="submit" className={styles.addButton}>
            Ajouter au panier
          </button>
        </form>
      </div>

      {/* Liste des articles */}
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p className={styles.emptyCart}>Votre panier est vide</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className={styles.cartItem}>
              {item.image && (
                <div className={styles.itemImage}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    objectFit="cover"
                  />
                </div>
              )}
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className={styles.price}>{item.price} €</p>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantity}>
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {cartItems.length > 0 && (
        <div className={styles.cartTotal}>
          <h3>Total: {calculateTotal().toFixed(2)} €</h3>
          <button className={styles.checkoutButton}>
            Procéder au paiement
          </button>
        </div>
      )}
    </div>
  );
}