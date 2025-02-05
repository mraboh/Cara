"use client";
import styles from "./page.module.css";
import {
  Search,
  Menu,
  ShoppingCart,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Heart,
  ChevronRight as ArrowRight,
  Smartphone,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Gift,
  Watch,
  Car,
  Baby,
  Gem as GemIcon,
  Flower2,
  Apple,
  Star,
  Footprints,
  Droplets,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import { products } from "./data/products";


export default function Home() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Électronique",
    "Mode",
    "Maison",
    "Sport",
    "Beauté",
    "Nouveautés",
    "Accessoires",
    "Auto",
    "Vêtements",
    "Enfants",
    "Creativité",
    "Jardin",
  ];

  const carouselItems = [
    { id: 1, title: "Casual Shirt", image: "/f1.jpg" },
    { id: 2, title: "Chemisette", image: "/f2.jpg" },
    { id: 3, title: "Chemise Pro", image: "/f3.jpg" },
    { id: 4, title: "qualite", image: "/f2.png" },
    // { id: 5, title: "costaunaut", image: "/f5.jpg" },
    { id: 6, title: "alimentation", image: "/f6.jpg" },
    { id: 7, title: "Exclusive Line", image: "/f7.jpg" },
    { id: 8, title: "quantite", image: "/f8.jpg" },
    { id: 9, title: "Classic Edition", image: "/n8.jpg" },
    { id: 10, title: "moderne", image: "/n1.jpg" },
    { id: 11, title: "collections", image: "/n2.jpg" },
    { id: 12, title: "Running Dress", image: "/n3.jpg" },
    { id: 13, title: "mLimited Series", image: "/n4.jpg" },
    { id: 14, title: "Premium Collection", image: "/n5.jpg" },
    { id: 15, title: "Sport Elite", image: "/n6.jpg" },
    { id: 16, title: "promotions", image: "/n7.jpg" },
  ];

  const sidebarCategories = [
    {
      name: "Vêtements Homme",
      icon: <Shirt className={styles.categoryIcon} />,
      color: "#FF6B6B",
    },
    {
      name: "Vêtements Femme",
      icon: <Droplets className={styles.categoryIcon} />,
      color: "#4ECDC4",
    },
    {
      name: "Chaussures",
      icon: <Footprints className={styles.categoryIcon} />,
      color: "#45B7D1",
    },
    {
      name: "Accessoires",
      icon: <Watch className={styles.categoryIcon} />,
      color: "#96CEB4",
    },
    {
      name: "Sport & Loisirs",
      icon: <Dumbbell className={styles.categoryIcon} />,
      color: "#FF9F1C",
    },
    {
      name: "Beauté",
      icon: <Sparkles className={styles.categoryIcon} />,
      color: "#2A9D8F",
    },
    {
      name: "Puma",
      icon: <Smartphone className={styles.categoryIcon} />,
      color: "#00BBF9",
    },
    {
      name: "Enfants",
      icon: <Baby className={styles.categoryIcon} />,
      color: "#F15BB5",
    },
    {
      name: "Asics",
      icon: <GemIcon className={styles.categoryIcon} />,
      color: "#FEE440",
    },
    {
      name: "Adidas",
      icon: <ShoppingBag className={styles.categoryIcon} />,
      color: "#8AC926",
    },
    {
      name: "Nike",
      icon: <Car className={styles.categoryIcon} />,
      color: "#FF595E",
    },
    {
      name: "Jardin",
      icon: <Flower2 className={styles.categoryIcon} />,
      color: "#2EC4B6",
    },
    {
      name: "Alimentation",
      icon: <Apple className={styles.categoryIcon} />,
      color: "#E63946",
    },
    {
      name: "Cadeaux",
      icon: <Gift className={styles.categoryIcon} />,
      color: "#9B5DE5",
    },

    {
      name: "Vêtements Homme",
      icon: <Shirt className={styles.categoryIcon} />,
      color: "#FF6B6B",
    },
    {
      name: "Vêtements Femme",
      icon: <Droplets className={styles.categoryIcon} />,
      color: "#4ECDC4",
    },
    {
      name: "Chaussures",
      icon: <Footprints className={styles.categoryIcon} />,
      color: "#45B7D1",
    },
    {
      name: "Accessoires",
      icon: <Watch className={styles.categoryIcon} />,
      color: "#96CEB4",
    },
    {
      name: "Sport & Loisirs",
      icon: <Dumbbell className={styles.categoryIcon} />,
      color: "#FF9F1C",
    },
    {
      name: "Beauté",
      icon: <Sparkles className={styles.categoryIcon} />,
      color: "#2A9D8F",
    },
    {
      name: "Puma",
      icon: <Smartphone className={styles.categoryIcon} />,
      color: "#00BBF9",
    },
    {
      name: "Enfants",
      icon: <Baby className={styles.categoryIcon} />,
      color: "#F15BB5",
    },
    {
      name: "Asics",
      icon: <GemIcon className={styles.categoryIcon} />,
      color: "#FEE440",
    },
    {
      name: "Adidas",
      icon: <ShoppingBag className={styles.categoryIcon} />,
      color: "#8AC926",
    },

    {
      name: "Enfants",
      icon: <Baby className={styles.categoryIcon} />,
      color: "#F15BB5",
    },
    {
      name: "Asics",
      icon: <GemIcon className={styles.categoryIcon} />,
      color: "#FEE440",
    },
    {
      name: "Adidas",
      icon: <ShoppingBag className={styles.categoryIcon} />,
      color: "#8AC926",
    },
    {
      name: "Nike",
      icon: <Car className={styles.categoryIcon} />,
      color: "#FF595E",
    },
    {
      name: "Jardin",
      icon: <Flower2 className={styles.categoryIcon} />,
      color: "#2EC4B6",
    },
    {
      name: "Alimentation",
      icon: <Apple className={styles.categoryIcon} />,
      color: "#E63946",
    },
    {
      name: "Cadeaux",
      icon: <Gift className={styles.categoryIcon} />,
      color: "#9B5DE5",
    },

    {
      name: "Vêtements Homme",
      icon: <Shirt className={styles.categoryIcon} />,
      color: "#FF6B6B",
    },
    {
      name: "Vêtements Femme",
      icon: <Droplets className={styles.categoryIcon} />,
      color: "#4ECDC4",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Paul Martin",
      rating: 5,
      date: "28 Janvier 2025",
      product: "Tennis Asics",
      comment:
        "Excellent rapport qualité-prix ! La tennis est parfaitement agréable à porter.",
      profileImage: "/profiles/profile1.jpg",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      rating: 4,
      date: "25 Janvier 2025",
      product: "NIkE shirt d'Été",
      comment:
        "Très satisfait de mon achat. Le service client est réactif et la livraison rapide.",
      profileImage: "/profiles/profile2.jpg",
    },

    {
      id: 3,
      name: "Emma Petit",
      rating: 4,
      date: "18 Janvier 2025",
      product: "Casual Shirt Classic",
      comment: "Très belle qualité de finition. Je suis ravie de mon achat !",
      profileImage: "/profiles/profile5.jpg",
    },
  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerBottom}>
          <div className={styles.quickCategories}>
            {categories.slice(0, 11).map((category, index) => (
              <span key={index} className={styles.category}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.carousel}>
        <h2 className={styles.sectionTitle}>Nos Produits Populaires</h2>
        <Swiper
          modules={[Navigation, FreeMode, Autoplay]}
          spaceBetween={5}
          slidesPerView={7}
          navigation
          freeMode
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className={styles.swiper}
        >
          {carouselItems.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              <div className={styles.carouselCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className={styles.mainLayout}>
        <aside className={styles.categorySidebar}>
          {sidebarCategories.map((category, index) => (
            <div key={index} className={styles.sidebarItem}>
              <div className={styles.sidebarItemLeft}>
                <div
                  className={styles.iconWrapper}
                  style={{ color: category.color }}
                >
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </div>
              <ArrowRight className={styles.arrowIcon} />
            </div>
          ))}
        </aside>

        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <Link
                href={`/detail/${product.id}`}
                key={product.id}
                className={styles.productCard}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>
                  <span className={styles.productPrice}>
                    {product.price[Object.keys(product.price)[0]]} FCFA
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.bottomSection}>
        <div className={styles.reviews}>
          <h2>Avis de nos clients</h2>
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.profileImage}>
                      <User size={24} />
                    </div>
                    <div>
                      <h3>{review.name}</h3>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                  </div>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < review.rating
                            ? styles.starFilled
                            : styles.starEmpty
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <strong>Produit acheté :</strong> {review.product}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.about}>
          <h2>À propos de CaraShop</h2>
          <div className={styles.aboutContent}>
            <p>
              Bienvenue sur CaraShop, votre destination shopping en ligne de
              Livraison. Nous sommes passionnés par la mode et nous nous
              engageons à vous offrir une expérience shopping unique et
              personnalisée.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.feature}>
                <h3>Notre Mission</h3>
                <p>
                  Rendre la mode accessible à tous en proposant des vêtements de
                  qualité à des prix compétitifs, tout en garantissant une
                  expérience de livraison agréable et sécurisée.
                </p>
              </div>
              <div className={styles.feature}>
                <h3>Notre Engagement</h3>
                <p>
                  Satisfaction client garantie, service après-vente réactif,
                  livraison rapide et sécurisée, et une sélection rigoureuse de
                  nos produits pour vous garantir le meilleur.
                </p>
              </div>
              <div className={styles.feature}>
                <h3>Nos Valeurs</h3>
                <p>
                  Qualité, authenticité, service client exceptionnel et
                  développement durable sont au cœur de nos préoccupations pour
                  vous offrir le meilleur de la mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
