// CartContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const loadCart = () => {
      if (typeof window === "undefined") return;

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          const count = parsedCart.reduce(
            (total, item) => total + (item.quantity || 0),
            0
          );
          setCartCount(count);
        } catch (error) {
          console.error("Error loading cart:", error);
          localStorage.removeItem("cart");
          setCart([]);
          setCartCount(0);
        }
      }
      setIsInitialized(true);
    };

    loadCart();

    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    setCartCount(count);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isInitialized]);
  const addToCart = (product, quantity, selectedSize) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        // Update existing item
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      // Add new item
      return [...prevCart, { ...product, quantity }];
    });
  };
  const removeFromCart = (productId, selectedSize = null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedSize = null) => {
    if (quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Get the price for the selected size
      const price =
        typeof item.price === "object"
          ? item.price[item.selectedSize]
          : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
