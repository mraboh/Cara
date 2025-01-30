'use client';
import styles from './page.module.css';
import { Search, Menu, ShoppingCart, Bell, User, ChevronLeft, ChevronRight, FileText, 
  Heart, ChevronRight as ArrowRight, Smartphone, Laptop, Headphones, Camera, Watch, 
  Tv, Speaker, Gamepad, Printer, Mouse, Keyboard, Monitor, Cpu, Battery, Radio, 
  Shirt, Dress, Footprints, Dumbbell, Sparkles, Home as HomeIcon, Baby, GemIcon, BookOpen, Car, 
  Flower2, Apple, Gift, X, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import { products } from './data/products';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'Électronique', 'Mode', 'Maison', 'Sport', 'Beauté', 
    'Jouets', 'Auto', 'Jardin', 'Livres', 'Musique', 'Alimentation',
    'Électronique', 'Mode', 'Maison', 'Sport', 'Beauté'
  ];

  const carouselItems = [
    { 
      id: 1,
      image: '/f1.jpg', 
      title: 'Sneakers Nike',
      price: '85.000'
    },
    { 
      id: 2,
      image: '/f2.jpg', 
      title: 'Chemisette',
      price: '75.000'
    },
    { 
      id: 3,
      image: '/f3.jpg', 
      title: 'Costauneaut',
      price: '65.000'
    },
    { 
      id: 4,
      image: '/f4.jpg', 
      title: 'Running Dress',
      price: '70.000'
    },
    { 
      id: 5,
      image: '/f5.jpg', 
      title: 'Casual Shirt',
      price: '60.000'
    },
    { 
      id: 6,
      image: '/f6.jpg', 
      title: 'Chemise Pro',
      price: '75.000'
    },
    { 
      id: 7,
      image: '/f7.jpg', 
      title: 'Urban Style',
      price: '65.000'
    },
    { 
      id: 8,
      image: '/f8.jpg', 
      title: 'Street Wear',
      price: '60.000'
    },
    { 
      id: 9,
      image: '/n1.jpg', 
      title: 'Classic Edition',
      price: '70.000'
    },
    { 
      id: 10,
      image: '/n2.jpg', 
      title: 'Limited Series',
      price: '80.000'
    },
    { 
      id: 11,
      image: '/n3.jpg', 
      title: 'Sport Elite',
      price: '85.000'
    },
    { 
      id: 12,
      image: '/n4.jpg', 
      title: 'Premium Collection',
      price: '90.000'
    },
    { 
      id: 13,
      image: '/n5.jpg', 
      title: 'Designer Edition',
      price: '95.000'
    },
    { 
      id: 14,
      image: '/n6.jpg', 
      title: 'Exclusive Line',
      price: '100.000'
    },
  ];

  const sidebarCategories = [
    { name: 'Vêtements Homme', icon: <Shirt className={styles.categoryIcon} />, color: '#FF6B6B' },
    // { name: 'Vêtements Femme', icon: <Dress className={styles.categoryIcon} />, color: '#4ECDC4' },
    { name: 'Chaussures', icon: <Footprints className={styles.categoryIcon} />, color: '#45B7D1' },
    { name: 'Accessoires', icon: <Watch className={styles.categoryIcon} />, color: '#96CEB4' },
    { name: 'Sport & Loisirs', icon: <Dumbbell className={styles.categoryIcon} />, color: '#FF9F1C' },
    { name: 'Beauté & Bien-être', icon: <Sparkles className={styles.categoryIcon} />, color: '#D4A5A5' },
    { name: 'Vêtements Femme', icon: <HomeIcon className={styles.categoryIcon} />, color: '#9B5DE5' },
    { name: 'Puma', icon: <Smartphone className={styles.categoryIcon} />, color: '#00BBF9' },
    { name: 'Enfants', icon: <Baby className={styles.categoryIcon} />, color: '#F15BB5' },
    { name: 'Asics', icon: <GemIcon className={styles.categoryIcon} />, color: '#FEE440' },
    { name: 'Adidas', icon: <BookOpen className={styles.categoryIcon} />, color: '#8AC926' },
    { name: 'Nike', icon: <Car className={styles.categoryIcon} />, color: '#FF595E' },
    { name: 'Jardin', icon: <Flower2 className={styles.categoryIcon} />, color: '#2EC4B6' },
    { name: 'Alimentation', icon: <Apple className={styles.categoryIcon} />, color: '#E63946' },
    { name: 'Cadeaux', icon: <Gift className={styles.categoryIcon} />, color: '#FF477E' }
  ];

  const filterOptions = [
   
    { title: 'Prix', options: ['0-50.000', '50.000-100.000', '100.000+'] },
    { title: 'État', options: ['Neuf', 'Occasion', 'Reconditionné'] },
    { title: 'Livraison', options: ['Express', 'Standard'] },
    { title: 'Stock', options: ['Disponible', 'Sur commande'] },

  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoSearch}>
            <div className={styles.logo}>
              <img src="/logo.jpg" alt="" />
              {/* <h1>CaraShop</h1> */}
            </div>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Rechercher un produit..." />
              <button type="button" className={styles.searchButton}>
                <Search className={styles.searchIcon} />
              </button>
            </div>
          </div>
          
          <nav className={styles.navigation}>
            <Link href="/notification" className={styles.navItem}>
              <Bell className={styles.icon} />
              <span>Notifications</span>
            </Link>
            <Link href="/login" className={styles.navItem}>
              <User className={styles.icon} />
              <span>Connexion</span>
            </Link>
            <Link href="/commandes" className={styles.navItem}>
              <FileText className={styles.icon} />
              <span>Commandes</span>
            </Link>
            <Link href="/panier" className={styles.navItem}>
              <ShoppingCart className={styles.icon} />
              <span>Panier</span>
            </Link>
          </nav>
        </div>

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
          modules={[Navigation, FreeMode]}
          spaceBetween={20}
          slidesPerView="auto"
          navigation
          freeMode
          className={styles.swiper}
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className={styles.carouselCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
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

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.mainTitle}>Nos Catégories</h2>
          <p className={styles.subTitle}>Découvrez notre large sélection de produits</p>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.categorySidebar}>
            {sidebarCategories.map((category, index) => (
              <div key={index} className={styles.sidebarItem}>
                <div className={styles.sidebarItemLeft}>
                  <div className={styles.iconWrapper} style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </div>
                <ArrowRight className={styles.arrowIcon} />
              </div>
            ))}
          </div>

          <div className={styles.mainContent}>
            <div className={styles.filterSection}>
              {filterOptions.map((filter, index) => (
                <div key={index} className={styles.filterGroup}>
                  <h3>{filter.title}</h3>
                  {filter.options.map((option, optionIndex) => (
                    <label key={optionIndex} className={styles.filterOption}>
                      <input type="checkbox" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.productsGrid}>
              {products.map((product) => (
                <Link href={`/detail/${product.id}`} key={product.id} className={styles.productCard}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>
                    <span className={styles.productPrice}>
                      {typeof product.price === 'object' 
                        ? Object.values(product.price)[0] 
                        : product.price}F
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.reviewsSection}>
          <h2>Avis clients</h2>
          <div className={styles.reviewsList}>
            {[
              {
                id: 1,
                name: "Marie L.",
                date: "28 janvier 2024",
                rating: 5,
                product: "Nike Air Max 270 - Blanc",
                size: "38",
                comment: "Superbes baskets ! Le confort est incroyable et le style est parfait pour un look décontracté."
              },
              {
                id: 2,
                name: "David R.",
                date: "25 janvier 2024",
                rating: 4,
                product: "Adidas Ultraboost - Noir",
                size: "42",
                comment: "Très satisfait de mon achat. La qualité est au rendez-vous et le design est moderne."
              },
              {
                id: 3,
                name: "Sophie M.",
                date: "22 janvier 2024",
                rating: 5,
                product: "Puma RS-X - Rouge",
                size: "39",
                comment: "Ces chaussures sont parfaites ! Confortables dès le premier jour et le style est unique."
              }
            ].map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewInitials}>
                    {review.name.split(' ')[0][0]}
                  </div>
                  <div className={styles.reviewInfo}>
                    <div className={styles.reviewName}>{review.name}</div>
                    <div className={styles.reviewDate}>{review.date}</div>
                  </div>
                  <div className={styles.reviewProduct}>
                    <div>{review.product}</div>
                    <div className={styles.reviewSize}>Taille : {review.size}</div>
                  </div>
                </div>
                <div className={styles.reviewStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#ff0000" : "none"}
                      stroke={i < review.rating ? "#ff0000" : "#666"}
                    />
                  ))}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statsSection}>
          <h2>Statistiques</h2>
          <table className={styles.statsTable}>
            <tbody>
              {[
                { label: "Satisfaction client", value: "95%" },
                { label: "Livraison à temps", value: "98%" },
                { label: "Retours produits", value: "2%" },
                { label: "Clients fidèles", value: "85%" },
                { label: "Recommandations", value: "92%" }
              ].map(stat => (
                <tr key={stat.label}>
                  <th>{stat.label}</th>
                  <td>{stat.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.characteristics}>
            <div className={styles.characteristicItem}>
              <span>Matériel</span>
              <span>Coton 20%</span>
            </div>
            <div className={styles.characteristicItem}>
              <span>Fabrication</span>
              <span>Made in France</span>
            </div>
            <div className={styles.characteristicItem}>
              <span>Qualité</span>
              <span>Premium</span>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              Notre engagement pour la qualité se reflète dans chaque produit. 
              Nous sélectionnons soigneusement nos matériaux et partenaires 
              pour vous offrir le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}