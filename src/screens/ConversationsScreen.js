
import { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import MobileOnlyView from '../components/MobileOnlyView';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import MessageTutorCard from '../components/messages/MessageTutorCard';



export default function ConversationsScreen() {
    
    const { language } = useLanguage();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user) {
          navigation.replace("ProfileLogin");
        }
      }, [user, navigation]);

    useEffect(() => {
        const fetchConversations = async () => {
            // Non eseguire la chiamata se l'utente non è autenticato
            if (!user) {
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const token = await AsyncStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('Token non trovato');
                }

                console.log('Chiamando API:', buildApiUrl(API_ENDPOINTS.CONVERSATIONS));
                console.log('Token presente:', !!token);

                const response = await fetch(buildApiUrl(API_ENDPOINTS.CONVERSATIONS), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                let data;
                try {
                    data = await response.json();
                    console.log('Response data:', data);
                } catch (parseError) {
                    console.error('Error parsing JSON response:', parseError);
                    const textResponse = await response.text();
                    console.log('Raw response text:', textResponse);
                    throw new Error(`Errore del server (${response.status}): Risposta non valida`);
                }
                
                if (!response.ok) {
                    // Gestione specifica per errore 500
                    if (response.status === 500) {
                        throw new Error(`Le conversazioni non sono ancora disponibili. Funzionalità in sviluppo.`);
                    }
                    if (response.status === 404) {
                        throw new Error(`Endpoint non trovato (404). Verifica che l'API sia configurata correttamente.`);
                    }
                    if (response.status === 401) {
                        throw new Error(`Non autorizzato (401). Token JWT scaduto o non valido.`);
                    }
                    
                    if (data.error) throw new Error(`API Error (${response.status}): ${data.error}`);
                    if (data.errors) throw new Error(`Validation Errors (${response.status}): ${data.errors.map(e => e.msg).join(', ')}`);
                    throw new Error(`HTTP ${response.status}: ${translations[language].home.unknownError || 'Errore sconosciuto'}`);
                }

                // According to docs, the response should have conversations array
                setConversations(data.conversations || []);
                
            } catch (err) {
                console.error('Errore nel caricamento delle conversazioni:', err);
                
                // Se è errore 500, mostra messaggio specifico e dati mock per sviluppo
                if (err.message.includes('500') || err.message.includes('sviluppo')) {
                    setError('Le conversazioni non sono ancora disponibili. Funzionalità in sviluppo.');
                    
                    // Opzionale: dati mock per test UI
                    setConversations([
                        {
                            id: 1,
                            otherUser: { name: "Demo Tutor", role: "tutor", pro: true, subject: 'Matematica' },
                            lastMessage: "Ciao! Sono disponibile per lezioni di matematica",
                            lastMessageTime: new Date().toISOString(),
                            unreadCount: 2
                        },
                        {
                            id: 2,
                            otherUser: { name: "Test Student", role: "student" },
                            lastMessage: "Grazie per la lezione!",
                            lastMessageTime: new Date().toISOString(),
                            unreadCount: 0
                        }
                    ]);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchConversations();
    }, [language, user]);

  return (
    <MobileOnlyView>
      <Header />
      <ScrollView style={defaultStyle.container}>
        {loading ? (
          <Text style={{...defaultStyle.buttonFooterText}}>Caricamento conversazioni...</Text>
        ) : error ? (
          <>
            <Text style={{...defaultStyle.buttonFooterText, color: 'orange', marginBottom: 10}}>
              ⚠️ {error}
            </Text>
            {conversations.length > 0 && (
              <Text style={{...defaultStyle.buttonFooterText, fontSize: 14, marginBottom: 10}}>
                Dati di esempio per test:
              </Text>
            )}
          </>
        ) : null}
        
        {conversations.length === 0 && !loading && !error ? (
          <Text style={{...defaultStyle.buttonFooterText}}>Nessuna conversazione trovata</Text>
        ) : (
          conversations.map((conversation) => (
            <MessageTutorCard key={conversation.id} tutor={conversation.otherUser} />
          ))
        )}
      </ScrollView>
      <Footer />
    </MobileOnlyView>
  );
}
