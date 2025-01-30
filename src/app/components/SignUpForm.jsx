'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignUpForm.module.css';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { signup } from '../services/auth';

export default function SignUpForm({ onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      onClose();
      router.push('/'); // Rediriger vers la page d'accueil après inscription
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <div className={styles.formContainer}>
          <h2>Créer un compte</h2>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
