const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // Sauvegarder le token dans le localStorage
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur d\'inscription');
    }

    // Sauvegarder le token dans le localStorage
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};
