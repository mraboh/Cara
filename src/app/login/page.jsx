'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [welcome, setWelcome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setWelcome(`Bienvenue ${name} ! Vous pouvez maintenant vous connecter.`);
      // Récupérer les informations d'inscription
      const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
      if (registeredUser.email) {
        setFormData(prev => ({
          ...prev,
          email: registeredUser.email
        }));
      }
    }
  }, [searchParams]);

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

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      setError('Email ou mot de passe incorrect');
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Connexion</h1>
        
        {welcome && <div className={styles.welcome}>{welcome}</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail size={20} />
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

          <div className={styles.inputGroup}>
            <Lock size={20} />
            <div className={styles.passwordInput}>
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
                onClick={togglePasswordVisibility}
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className={styles.signupLink}>
            Pas encore de compte ?
            <Link href="/signup" className={styles.signupButton}>
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
