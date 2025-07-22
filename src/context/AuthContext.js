import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // user: { id, name, email, role, bio }

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        try {
          // Prova a recuperare i dati utente
          const res = await fetch('http://66.118.245.111:3000/api/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user || data); // accetta entrambi i formati
            setIsLoggedIn(true);
          } else {
            const data = await res.json();
            if (data.error) {
              await AsyncStorage.removeItem('jwtToken');
            }
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch {
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 