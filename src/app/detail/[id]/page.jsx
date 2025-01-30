'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import styles from './detail.module.css';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import OrderForm from '../../components/OrderForm';

export default function DetailPage() {
  const [selectedSize, setSelectedSize] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setTooltipVisible(false);
  };

  const handleCommanderClick = () => {
    if (!selectedSize) {
      setTooltipVisible(true);
      return;
    }
    setShowOrderForm(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setTooltipVisible(true);
      return;
    }
    // Logique pour ajouter au panier
  };

  return (
    <div className={styles.pageContainer}>
      <button onClick={handleBack} className={styles.backButton}>
        <ArrowLeft size={20} />
        Retour
      </button>
      
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} - vue ${index + 1}`}
                  width={80}
                  height={80}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.mainImage}>
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              width={500}
              height={500}
              className={styles.primaryImage}
            />
          </div>
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.rating}>
            <div className={styles.stars}>
              <Star className={styles.starIcon} />
              <span className={styles.ratingValue}>{product.rating}</span>
            </div>
            <span className={styles.reviews}>({product.reviews} avis)</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceSection}>
            <div className={styles.currentPrice}>
              {selectedSize ? product.price[selectedSize] : Object.values(product.price)[0]} FCFA
            </div>
            <div className={styles.oldPrice}>
              {product.oldPrice} FCFA
            </div>
          </div>

          <div className={styles.sizeSection}>
            <h3 className={styles.sizeTitle}>Tailles disponibles</h3>
            <div className={styles.sizeButtons}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <div className={styles.selectedSize}>
                Taille sélectionnée: {selectedSize}
              </div>
            )}
          </div>

          <div className={styles.actionSection}>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.addToCartButton} 
                onClick={handleAddToCart}
              >
                <ShoppingCart className={styles.cartIcon} />
                Ajouter au panier
              </button>
              <button 
                className={styles.commanderButton} 
                onClick={handleCommanderClick}
              >
                Commander
              </button>
            </div>
            {tooltipVisible && (
              <div className={styles.tooltip}>
                Veuillez sélectionner une taille
              </div>
            )}
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
  );
}
