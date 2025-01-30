import React from 'react';
import styles from './page.module.css';

const NotificationPage = () => {
  return (
    <div className={styles.container}>
      <h1>Notifications</h1>
      <div className={styles.notificationList}>
        <div className={styles.notification}>
          <h3>Nouvelle promotion</h3>
          <p>Profitez de -20% sur votre prochaine commande !</p>
          <span className={styles.time}>Il y a 2 heures</span>
        </div>
        <div className={styles.notification}>
          <h3>Commande expédiée</h3>
          <p>Votre commande #12345 a été expédiée</p>
          <span className={styles.time}>Il y a 1 jour</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
