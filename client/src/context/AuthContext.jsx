import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      const storedSession = localStorage.getItem('nexix_session');
      if (storedSession) {
        try {
          const parsedSession = JSON.parse(storedSession);
          setSession(parsedSession);
          
          // Verify JWT is still valid with backend
          const res = await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${parsedSession.access_token}`
            }
          });
          setUser(res.data.user);
        } catch (err) {
          console.warn('Stored session invalid or expired. Logging out...', err);
          localStorage.removeItem('nexix_session');
          setSession(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: loggedInUser, session: loggedInSession } = res.data;
      
      setUser(loggedInUser);
      setSession(loggedInSession);
      localStorage.setItem('nexix_session', JSON.stringify(loggedInSession));
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Login action error:', err);
      const errMsg = err.response?.data?.error || 'Invalid credentials or network issue.';
      setError(errMsg);
      setLoading(false);
      throw new Error(errMsg);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Sign-out action warning:', err);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem('nexix_session');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export default AuthContext;
