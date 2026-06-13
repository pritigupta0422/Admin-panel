import axios from 'axios';

// Get base API URL from Vite environment, default to localhost:5000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add Supabase Authorization Bearer Token
api.interceptors.request.use(
  (config) => {
    const sessionStr = localStorage.getItem('nexix_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session && session.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }
      } catch (err) {
        console.error('Error parsing stored session:', err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
