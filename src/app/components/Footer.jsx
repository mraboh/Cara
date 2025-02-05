import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  QrCode,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Section QR Code */}
        <div className={styles.footerSection}>
          <div className={styles.circleTitle}>Scanner</div>
          <div className={styles.qrCodeBox}>
            <QrCode size={100} />
          </div>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter />
            </a>
          </div>
        </div>

        {/* Section Partenaires */}
        <div className={styles.footerSection}>
          <div className={styles.circleTitle}>Partenaires</div>
          <ul>
            <li>Nike</li>
            <li>Adidas</li>
            <li>Puma</li>
            <li>Asics</li>
          </ul>
        </div>

        {/* Section Company */}
        <div className={styles.footerSection}>
          <div className={styles.circleTitle}>
            {" "}
            Détails sur les options de livraison:
          </div>
          <ul>
            <li>Politique de retour: conditions et procédure.</li>
            <li>Livraison standard (délai, coût)</li>
            <li>Livraison express (délai, coût)</li>
            <li>Zone de livraison:régions desservies.</li>
          </ul>
        </div>

        {/* Section Contact */}
        <div className={styles.footerSection}>
          <div className={styles.circleTitle}>Contact</div>
          <ul className={styles.contactInfo}>
            <li>
              <MapPin size={16} />
              <span>Douala, Cameroun</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+237 690 558 216</span>
            </li>
            <li>
              <Mail size={16} />
              <span>contact@carashop.com</span>
            </li>
            <li>
              <Clock size={16} />
              <span> 24h/7</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Titres circulaires supplémentaires */}
      <div className={styles.circularTitles}>
        <div className={styles.circleTitles}>Nouveautés</div>
        <div className={styles.circleTitles}>Accessoires</div>
        <div className={styles.circleTitles}>Collections</div>
        <div className={styles.circleTitles}>Vêtements</div>
        <div className={styles.circleTitles}>Promotions</div>
        <div className={styles.circleTitles}>Sports</div>
      </div>

      <div className={styles.footerBottom}>
        <p> {currentYear} CaraShop - Votre boutique en ligne depuis 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
