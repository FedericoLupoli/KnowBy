/**
 * Utility per testare la connessione API e diagnosticare problemi
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

export const testApiConnection = async () => {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: buildApiUrl(''),
    tests: []
  };

  // Test 1: Connessione di base
  try {
    const response = await fetch(buildApiUrl('api/health'), {
      method: 'GET',
      timeout: 5000
    });
    
    results.tests.push({
      name: 'Health Check',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      details: response.ok ? 'Server raggiungibile' : `Errore HTTP ${response.status}`
    });
  } catch (error) {
    results.tests.push({
      name: 'Health Check',
      status: 'FAIL',
      error: error.message,
      details: 'Server non raggiungibile'
    });
  }

  // Test 2: Endpoint /api/me (se c'è un token)
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.ME), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });

      const data = await response.json();
      
      results.tests.push({
        name: 'ME Endpoint',
        status: response.ok ? 'PASS' : 'FAIL',
        statusCode: response.status,
        hasToken: true,
        responseData: data,
        hasId: !!(data && (data.id || (data.user && data.user.id))),
        hasEmail: !!(data && (data.email || (data.user && data.user.email))),
        details: response.ok ? 'Endpoint /api/me funzionante' : `Errore: ${data.error || 'Dati incompleti'}`
      });
    } else {
      results.tests.push({
        name: 'ME Endpoint',
        status: 'SKIP',
        hasToken: false,
        details: 'Nessun token JWT presente'
      });
    }
  } catch (error) {
    results.tests.push({
      name: 'ME Endpoint',
      status: 'FAIL',
      error: error.message,
      details: 'Errore nella chiamata a /api/me'
    });
  }

  return results;
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
    return { success: true, message: 'Token JWT rimosso con successo' };
  } catch (error) {
    return { success: false, message: `Errore: ${error.message}` };
  }
};

export const logUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('=== DIAGNOSTICA DATI UTENTE ===');
    console.log('Token presente:', !!token);
    if (token) {
      console.log('Token (primi 50 caratteri):', token.substring(0, 50) + '...');
      
      // Decodifica il payload JWT (solo per debug, non sicuro in produzione)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload JWT:', payload);
      } catch (_e) {
        console.log('Impossibile decodificare il token JWT');
      }
    }
    console.log('==============================');
  } catch (error) {
    console.log('Errore nel logging dei dati utente:', error);
  }
};
