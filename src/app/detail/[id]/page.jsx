'use client';
import { useState } from 'react';
import Image from 'next/image';
import { products } from '../../data/products';
import styles from './detail.module.css';
import OrderForm from '../../components/OrderForm';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';

export default function DetailPage({ params }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleOrder = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    setShowOrderForm(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <button 
        onClick={() => router.back()} 
        className={styles.backButton}
      >
        <ArrowLeft size={20} />
        Retour
      </button>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              width={400}
              height={400}
              objectFit="cover"
              priority
            />
            <button className={styles.prevButton} onClick={handlePrevImage}>
              &#10094;
            </button>
            <button className={styles.nextButton} onClick={handleNextImage}>
              &#10095;
            </button>
          </div>
          
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${currentImageIndex === index ? styles.active : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} - vue ${index + 1}`}
                  width={80}
                  height={80}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <h1>{product.title}</h1>
          
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  fill={index < Math.floor(product.rating) ? "#ffd700" : "none"}
                  color={index < Math.floor(product.rating) ? "#ffd700" : "#ddd"}
                />
              ))}
            </div>
            <span>{product.rating} ({product.reviews} avis)</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceSection}>
            <div className={styles.prices}>
              <span className={styles.price}>
                {selectedSize ? `${product.price[selectedSize]} FCFA` : 'Sélectionnez une taille'}
              </span>
              {selectedSize && (
                <span className={styles.oldPrice}>{product.oldPrice} FCFA</span>
              )}
            </div>
          </div>

          <div className={styles.sizes}>
            <h3>Tailles disponibles</h3>
            <div className={styles.sizeButtons}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              className={styles.addToCartButton}
              onClick={() => {
                if (!selectedSize) {
                  alert('Veuillez sélectionner une taille');
                  return;
                }
                // Logique pour ajouter au panier
                alert('Produit ajouté au panier');
              }}
              disabled={!selectedSize}
            >
              <ShoppingCart size={20} />
              Ajouter au panier
            </button>

            <button 
              className={styles.orderButton}
              onClick={handleOrder}
              disabled={!selectedSize}
            >
              Commander 
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
  );
}
