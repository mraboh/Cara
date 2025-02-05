"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./detail.module.css";
import { products } from "../../data/products";
import OrderForm from "../../components/OrderForm";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function DetailsContent({ id }) {
  // Now receiving id as a prop
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);

  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const productId = parseInt(id); // Use the id prop instead of params
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Veuillez sélectionner une taille");
      return;
    }

    if (!user) {
      setError("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    try {
      const productWithSize = {
        id: product.id,
        title: product.title,
        image: product.similarImages[0], // Use the first image as main image
        selectedSize,
        price: product.price[selectedSize], // This ensures we get the correct price for the size
        quantity: 1,
      };

      addToCart(productWithSize, 1, selectedSize);
      setAddedToCart(true);
    } catch (error) {
      setError(error.message);
    }
};

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setCurrentPrice(product.price[size]);
    setError("");
    setAddedToCart(false);
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
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} vue ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.mainImage}>
              <img
                src={product.similarImages[selectedImage]}
                alt={product.title}
              />
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
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.selected : ""
                    }`}
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
            {addedToCart && (
              <p className={styles.success}>Produit ajouté au panier !</p>
            )}

            <div className={styles.buttonGroup}>
              <button
                className={styles.cartButton}
                onClick={handleAddToCart}
                disabled={!user}
              >
                {user
                  ? "Ajouter au panier"
                  : "Connectez-vous pour ajouter au panier"}
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
