import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage() {
  // Stato lingua globale
  const { language } = useLanguage();
  const { user, setUser } = useAuth();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('user');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // MOCK: ruolo utente (in futuro da context o API)
  const userRole = 'student'; // Cambia in 'tutor' per testare il controllo

  if (!user) {
    return (
      <MobileOnlyView>
        <View style={defaultStyle.container}>
          <Header />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
              Nessun utente loggato.
            </Text>
          </View>
          <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        </View>
      </MobileOnlyView>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const res = await fetch(`http://66.118.245.111:3000/api/users/${user.id}`, {
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
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        Alert.alert('Errore', err.error || 'Errore durante il salvataggio');
      } else {
        const data = await res.json();
        setUser(data.user);
        Alert.alert('Successo', 'Profilo aggiornato!');
      }
    } catch (e) {
      Alert.alert('Errore', 'Errore di rete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />

        {/* Body principale: personalizzazione profilo studente (debug) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#00bfff', fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>👤 Il tuo profilo</Text>
          <View style={{ backgroundColor: '#181f1f', borderRadius: 16, padding: 20, width: '100%', marginBottom: 18 }}>
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Nome</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={name}
              onChangeText={setName}
              placeholder="Nome"
              placeholderTextColor="#aaa"
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Email</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Bio</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff', minHeight: 60, textAlignVertical: 'top' }}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor="#aaa"
              multiline
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Password (nuova, opzionale)</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff' }}
              value={password}
              onChangeText={setPassword}
              placeholder="Nuova password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <Button title={loading ? 'Salvataggio...' : 'Salva modifiche'} color="#00bfff" onPress={handleSave} disabled={loading} />
          </View>
        </ScrollView>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}