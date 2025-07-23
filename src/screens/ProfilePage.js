import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import AuthErrorBanner from '../components/AuthErrorBanner';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

export default function ProfilePage() {
  // Stato lingua globale
  const { language } = useLanguage();
  const { user, setUser, isLoading: authLoading } = useAuth();
  const navigation = useNavigation();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [dataInitialized, setDataInitialized] = useState(false);

  // Inizializza i dati quando l'utente è disponibile
  React.useEffect(() => {
    if (user && !dataInitialized) {
      setName(user.name || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setSubject(user.subject || '');
      setHourlyRate(user.hourlyRate ? String(user.hourlyRate) : '');
      setDataInitialized(true);
    }
  }, [user, dataInitialized]);

  // Refresh dei dati utente se incompleti
  React.useEffect(() => {
    const refreshUserData = async () => {
      if (user && (!user.name || !user.email)) {
        try {
          const token = await AsyncStorage.getItem('jwtToken');
          if (token) {
            const res = await fetch(buildApiUrl(API_ENDPOINTS.ME), {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              const userData = data.user || data;
              if (userData && userData.id && userData.email) {
                setUser(userData);
              }
            }
          }
        } catch (error) {
          console.log('Errore refresh dati utente:', error);
        }
      }
    };

    refreshUserData();
  }, [user, setUser]);

  // Redirect automatico se non autenticato e non in caricamento
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigation.replace('ProfileLogin');
    }
  }, [user, authLoading, navigation]);

  // Mostra loader durante l'autenticazione o se i dati non sono ancora inizializzati
  if (authLoading || !user || !dataInitialized) {
    return (
      <MobileOnlyView>
        <View style={[defaultStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#00bfff', fontSize: 18 }}>
            {translations[language]?.profilePage?.loading || 'Caricamento...'}
          </Text>
        </View>
      </MobileOnlyView>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      // 1. Modifica dati
      const res = await fetch(`${buildApiUrl(API_ENDPOINTS.USERS)}/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          bio,
          password: password.length > 0 ? password : undefined,
          subject: user.role === 'tutor' ? subject : undefined,
          hourlyRate: user.role === 'tutor' && hourlyRate ? Number(hourlyRate) : undefined,
        }),
      });
      let result;
      try {
        result = await res.json();
      } catch (_jsonErr) {
        const text = await res.text();
        console.log('Risposta non JSON:', text);
        throw new Error('Risposta non JSON: ' + text);
      }
      if (!res.ok) {
        if (result.error) {
          Alert.alert(translations[language].profilePage.error, result.error);
        } else if (result.errors) {
          Alert.alert(translations[language].profilePage.error, result.errors.map(e => e.msg).join(', '));
        } else {
          Alert.alert(translations[language].profilePage.error, translations[language].profilePage.saveError);
        }
      } else {
        // 2. Recupera i dati aggiornati (autenticato)
        const resUser = await fetch(`${buildApiUrl(API_ENDPOINTS.USERS)}/${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resUser.ok) {
          const data = await resUser.json();
          setUser(data.user || data);
        }
        Alert.alert(translations[language].profilePage.success, result.message || translations[language].profilePage.profileUpdated);
      }
    } catch (e) {
      console.log('Errore di rete o fetch:', e);
      Alert.alert(translations[language].profilePage.networkError, typeof e === 'object' ? JSON.stringify(e) : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />
        
        {/* Banner per errori di autenticazione */}
        <AuthErrorBanner />

        {/* Body principale: personalizzazione profilo studente (debug) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#00bfff', fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>👤 {translations[language].profilePage.title}</Text>
          <View style={{ backgroundColor: '#181f1f', borderRadius: 16, padding: 20, width: '100%', marginBottom: 18 }}>
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.name}</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={name}
              onChangeText={setName}
              placeholder={translations[language].profilePage.name}
              placeholderTextColor="#aaa"
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.email}</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={email}
              onChangeText={setEmail}
              placeholder={translations[language].profilePage.email}
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {user.role === 'tutor' && (
              <>
                <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.subject}</Text>
                <TextInput
                  style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
                  value={subject}
                  onChangeText={setSubject}
                  placeholder={translations[language].profilePage.subject}
                  placeholderTextColor="#aaa"
                />
                <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.hourlyRate}</Text>
                <TextInput
                  style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
                  value={hourlyRate}
                  onChangeText={setHourlyRate}
                  placeholder={user?.hourlyRate ? String(user.hourlyRate) : translations[language].profilePage.hourlyRatePlaceholder}
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                />
              </>
            )}
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.bio}</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff', minHeight: 60, textAlignVertical: 'top' }}
              value={bio}
              onChangeText={setBio}
              placeholder={translations[language].profilePage.bio}
              placeholderTextColor="#aaa"
              multiline
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>{translations[language].profilePage.newPassword}</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={password}
              onChangeText={setPassword}
              placeholder={translations[language].profilePage.newPasswordPlaceholder}
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <Button title={loading ? translations[language].profilePage.saving : translations[language].profilePage.saveChanges} color="#00bfff" onPress={handleSave} disabled={loading} />
          </View>
        </ScrollView>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}