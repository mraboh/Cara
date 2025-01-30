'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import SignUpForm from '../components/SignUpForm';
import { login } from '../services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    try {
      await login(formData);
      router.push('/'); // Rediriger vers la page d'accueil après connexion
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Connexion</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <User className={styles.icon} />
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

          <div className={styles.inputGroup}>
            <Lock className={styles.icon} />
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

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className={styles.signupText}>
          Pas encore de compte ?{' '}
          <button 
            className={styles.signupLink}
            onClick={() => setShowSignUpForm(true)}
            disabled={loading}
          >
            S'inscrire
          </button>
        </p>
      </div>

      {showSignUpForm && (
        <SignUpForm onClose={() => setShowSignUpForm(false)} />
      )}
    </div>
  );
}
