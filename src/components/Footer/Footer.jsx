import Image from 'next/image';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, QrCode, FileText } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <Image
                src="/logo.jpg"
                alt="Carashop Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles.scanBox}>
              <QrCode size={80} color="white" />
            </div>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <Facebook size={20} color="white" />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Instagram size={20} color="white" />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Twitter size={20} color="white" />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Partenaires</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Nike</li>
              <li className={styles.listItem}>Adidas</li>
              <li className={styles.listItem}>Puma</li>
              <li className={styles.listItem}>Asics</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>À propos</li>
              <li className={styles.listItem}>Carrières</li>
              <li className={styles.listItem}>Blog</li>
              <li className={styles.listItem}>Conditions</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span> Rue du Commerce, DOUALA</span> 
              </div>
              <div className={styles.contactItem}>
                <FileText size={18} />
                <span>24h/7</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>+237 690 558 216</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <span>contact@Carashop.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.categories}>
          <span className={styles.category}>Chaussures</span>
          <span className={styles.category}>Vêtements</span>
          <span className={styles.category}>Sport</span>
          <span className={styles.category}>Accessoires</span>
          <span className={styles.category}>Nouveautés</span>
          <span className={styles.category}>Promotions</span>
          <span className={styles.category}>Collections</span>
        </div>

        <div className={styles.bottomSection}>
          <p> 2025 Carashop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}