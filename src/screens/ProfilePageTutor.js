import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePageTutor() {
  // Stato lingua globale
  const { language } = useLanguage();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('user');
  // Mock dati tutor
  const [name, setName] = useState('Mario Bianchi');
  const [email, setEmail] = useState('mario.bianchi@email.com');
  const [password, setPassword] = useState('password123');
  const [bio, setBio] = useState('Esperto in matematica con 5 anni di esperienza');
  const [hourlyRate, setHourlyRate] = useState('25');

  // MOCK: ruolo utente (in futuro da context o API)
  const userRole = 'tutor'; // Cambia in 'student' per testare il controllo

  // Se non è tutor, mostra messaggio di errore/debug
  if (userRole !== 'tutor') {
    return (
      <MobileOnlyView>
        <View style={defaultStyle.container}>
          <Header />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
              Accesso negato: questa pagina è riservata ai tutor.
            </Text>
          </View>
          <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        </View>
      </MobileOnlyView>
    );
  }

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />

        {/* Body principale: personalizzazione profilo tutor (debug) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}>
          {/* Titolo */}
          <Text style={{ color: '#43a047', fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>👨‍🏫 Personalizza il tuo profilo Tutor</Text>

          {/* Form modifica dati tutor */}
          <View style={{ backgroundColor: '#181f1f', borderRadius: 16, padding: 20, width: '100%', marginBottom: 18 }}>
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Nome</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#43a047' }}
              value={name}
              onChangeText={setName}
              placeholder="Nome"
              placeholderTextColor="#aaa"
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Email</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#43a047' }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Password</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#43a047' }}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Bio</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#43a047', minHeight: 60, textAlignVertical: 'top' }}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor="#aaa"
              multiline={true}
            />
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Tariffa oraria (€)</Text>
            <TextInput
              style={{ backgroundColor: '#232b2b', color: '#efeff2', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#43a047' }}
              value={hourlyRate}
              onChangeText={setHourlyRate}
              placeholder="Tariffa oraria"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
            {/* Pulsante salva (non funzionante, solo UI) */}
            <Button title="Salva modifiche" color="#43a047" onPress={() => {}} />
          </View>
        </ScrollView>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
} 