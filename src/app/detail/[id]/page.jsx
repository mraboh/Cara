'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './detail.module.css';
import { products } from '../../data/products';
import OrderForm from '../../components/OrderForm';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function DetailPage({ params }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setCurrentPrice(product.price[size]);
    setError('');
    setAddedToCart(false);
  };

  const handleOrderClick = () => {
    if (!selectedSize) {
      setError('Veuillez sélectionner une taille');
      return;
    }
    setShowOrderForm(true);
  };

  const handleCartClick = () => {
    if (!selectedSize) {
      setError('Veuillez sélectionner une taille');
      return;
    }

    // Récupérer le panier existant ou créer un nouveau
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Créer l'item à ajouter au panier
    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      size: selectedSize,
      price: product.price[selectedSize],
      quantity: 1
    };

    // Vérifier si le produit existe déjà dans le panier avec la même taille
    const existingItemIndex = cart.findIndex(
      item => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex !== -1) {
      // Si le produit existe, augmenter la quantité
      cart[existingItemIndex].quantity += 1;
    } else {
      // Sinon, ajouter le nouveau produit
      cart.push(cartItem);
    }

    // Sauvegarder le panier mis à jour
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);

    // Rediriger vers le panier après un court délai
    setTimeout(() => {
      router.push('/panier');
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.productDetails}>
          <div className={styles.imageSection}>
            <div className={styles.thumbnails}>
              {product.similarImages.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} vue ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.mainImage}>
              <img src={product.similarImages[selectedImage]} alt={product.title} />
            </div>
          </div>
          
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.sizeSection}>
              <h3>Sélectionnez votre taille</h3>
              <div className={styles.sizeGrid}>
                {Object.keys(product.price).map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    <span>{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedSize && (
              <div className={styles.priceSection}>
                <span className={styles.priceLabel}>Prix :</span>
                <span className={styles.price}>{currentPrice} fcfa</span>
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}
            {addedToCart && <p className={styles.success}>Produit ajouté au panier !</p>}

            <div className={styles.buttonGroup}>
              <button 
                className={styles.orderButton}
                onClick={handleOrderClick}
                disabled={addedToCart}
              >
                Commander
              </button>
              
              <button 
                className={styles.cartButton}
                onClick={handleCartClick}
                disabled={addedToCart}
              >
                {addedToCart ? 'Ajouté !' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        </div>

        {showOrderForm && (
          <OrderForm
            product={product}
            selectedSize={selectedSize}
            onClose={() => setShowOrderForm(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
