'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignUpForm.module.css';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation rapide des champs requis
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setIsSubmitting(false);
      return;
    }

    // Validation de l'email
    if (!formData.email.includes('@')) {
      setError('Veuillez entrer un email valide');
      setIsSubmitting(false);
      return;
    }

    // Validation du mot de passe
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Stocker les informations d'inscription dans le localStorage
      localStorage.setItem('registeredUser', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }));

      // Rediriger vers la page de connexion avec le nom
      router.push(`/login?name=${encodeURIComponent(formData.firstName)}`);
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Créer un compte</h2>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <Mail className={styles.icon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
}
