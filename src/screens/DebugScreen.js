import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { testApiConnection, clearUserData, logUserData } from '../utils/apiTest';
import MobileOnlyView from '../components/MobileOnlyView';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DebugScreen() {
  const { user, authError, logout } = useAuth();
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const results = await testApiConnection();
      setTestResults(results);
      await logUserData();
    } catch (error) {
      Alert.alert('Errore', `Diagnostica fallita: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    Alert.alert(
      'Conferma',
      'Vuoi rimuovere tutti i dati di autenticazione?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Conferma',
          style: 'destructive',
          onPress: async () => {
            const result = await clearUserData();
            Alert.alert('Risultato', result.message);
            if (result.success) {
              logout();
            }
          }
        }
      ]
    );
  };

  return (
    <MobileOnlyView>
      <View style={{ flex: 1, backgroundColor: '#232b2b' }}>
        <Header />
        
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ color: '#00bfff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Debug - Diagnostica App
          </Text>

          {/* Stato corrente */}
          <View style={{ marginBottom: 20, padding: 15, backgroundColor: '#333', borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
              Stato Utente
            </Text>
            <Text style={{ color: '#ccc', marginBottom: 5 }}>
              Autenticato: {user ? 'SÌ' : 'NO'}
            </Text>
            {user && (
              <>
                <Text style={{ color: '#ccc', marginBottom: 5 }}>
                  ID: {user.id || 'MANCANTE'}
                </Text>
                <Text style={{ color: '#ccc', marginBottom: 5 }}>
                  Email: {user.email || 'MANCANTE'}
                </Text>
                <Text style={{ color: '#ccc', marginBottom: 5 }}>
                  Nome: {user.name || 'MANCANTE'}
                </Text>
                <Text style={{ color: '#ccc', marginBottom: 5 }}>
                  Ruolo: {user.role || 'MANCANTE'}
                </Text>
              </>
            )}
            {authError && (
              <Text style={{ color: '#ff6b6b', marginTop: 10 }}>
                Errore: {authError}
              </Text>
            )}
          </View>

          {/* Controlli */}
          <View style={{ marginBottom: 20 }}>
            <Button 
              title={loading ? "Eseguendo diagnostica..." : "Esegui Diagnostica API"}
              onPress={runDiagnostics}
              disabled={loading}
              color="#00bfff"
            />
          </View>
          
          <View style={{ marginBottom: 20 }}>
            <Button 
              title="Rimuovi Dati Autenticazione"
              onPress={handleClearData}
              color="#ff6b6b"
            />
          </View>

          {/* Risultati test */}
          {testResults && (
            <View style={{ marginBottom: 20, padding: 15, backgroundColor: '#333', borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                Risultati Diagnostica
              </Text>
              <Text style={{ color: '#ccc', marginBottom: 10 }}>
                Timestamp: {testResults.timestamp}
              </Text>
              <Text style={{ color: '#ccc', marginBottom: 10 }}>
                URL Base: {testResults.baseUrl}
              </Text>
              
              {testResults.tests.map((test, index) => (
                <View key={index} style={{ 
                  marginBottom: 10, 
                  padding: 10, 
                  backgroundColor: test.status === 'PASS' ? '#2d5a2d' : test.status === 'FAIL' ? '#5a2d2d' : '#5a5a2d',
                  borderRadius: 5
                }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {test.name}: {test.status}
                  </Text>
                  {test.statusCode && (
                    <Text style={{ color: '#ccc', fontSize: 12 }}>
                      Status Code: {test.statusCode}
                    </Text>
                  )}
                  <Text style={{ color: '#ccc', fontSize: 12 }}>
                    {test.details}
                  </Text>
                  {test.name === 'ME Endpoint' && test.responseData && (
                    <View style={{ marginTop: 5 }}>
                      <Text style={{ color: '#ccc', fontSize: 12 }}>
                        Ha ID: {test.hasId ? 'SÌ' : 'NO'}
                      </Text>
                      <Text style={{ color: '#ccc', fontSize: 12 }}>
                        Ha Email: {test.hasEmail ? 'SÌ' : 'NO'}
                      </Text>
                    </View>
                  )}
                  {test.error && (
                    <Text style={{ color: '#ff9999', fontSize: 12, marginTop: 5 }}>
                      Errore: {test.error}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <Footer />
      </View>
    </MobileOnlyView>
  );
}
