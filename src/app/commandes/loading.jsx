'use client';
import styles from './loading.module.css';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Loader2 className={styles.spinner} />
      <p>Chargement des commandes...</p>
    </div>
  );
}
