import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // user: { id, name, email, role, bio }
  const [isLoading, setIsLoading] = useState(true); // Nuovo stato per il loading
  const [authError, setAuthError] = useState(null); // Nuovo stato per errori

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      setAuthError(null);
      
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        
        if (!token) {
          // Nessun token salvato
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        try {
          // Prova a recuperare i dati utente con timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondi timeout

          const res = await fetch('http://66.118.245.111:3000/api/me', {
            headers: { 'Authorization': `Bearer ${token}` },
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const userData = data.user || data;
            
            // Verifica che i dati utente siano completi
            if (userData && userData.id && userData.email) {
              setUser(userData);
              setIsLoggedIn(true);
              setAuthError(null);
            } else {
              // Dati utente incompleti, rimuovi token
              console.log('Dati utente incompleti:', userData);
              await AsyncStorage.removeItem('jwtToken');
              setUser(null);
              setIsLoggedIn(false);
              setAuthError('INCOMPLETE_USER_DATA');
            }
          } else {
            // Token non valido o scaduto
            console.log('Token non valido, status:', res.status);
            await AsyncStorage.removeItem('jwtToken');
            setUser(null);
            setIsLoggedIn(false);
            
            if (res.status === 401) {
              setAuthError('SESSION_EXPIRED');
            } else {
              setAuthError('AUTH_FAILED');
            }
          }
        } catch (fetchError) {
          console.log('Errore durante la verifica del token:', fetchError);
          
          if (fetchError.name === 'AbortError') {
            setAuthError('CONNECTION_TIMEOUT');
          } else {
            setAuthError('NETWORK_ERROR');
          }
          
          // In caso di errore di rete, mantieni lo stato precedente se possibile
          // Ma rimuovi il token se è chiaramente non valido
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (storageError) {
        console.log('Errore AsyncStorage:', storageError);
        setUser(null);
        setIsLoggedIn(false);
        setAuthError('STORAGE_ERROR');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  // Funzione per clear dell'errore
  const clearAuthError = () => setAuthError(null);

  // Funzione helper per logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      setUser(null);
      setIsLoggedIn(false);
      setAuthError(null);
    } catch (error) {
      console.log('Errore durante il logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      user, 
      setUser, 
      isLoading, 
      authError, 
      clearAuthError,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 