'use client';
import { useState } from 'react';
import styles from './register.module.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Formulaire de Commande</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="adresse">Adresse</label>
          <textarea
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="codePostal">Code Postal</label>
          <input
            type="text"
            id="codePostal"
            name="codePostal"
            value={formData.codePostal}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pays">Pays</label>
          <input
            type="text"
            id="pays"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Confirmer la commande
        </button>
      </form>
    </div>
  );
}
