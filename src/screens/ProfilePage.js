import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

export default function ProfilePage() {
  // Stato lingua globale
  const { language } = useLanguage();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('user');
  // Mock dati utente
  const [name, setName] = useState('Mario Rossi');
  const [email, setEmail] = useState('mario.rossi@email.com');
  const [password, setPassword] = useState('password123');
  // Solo visualizzazione per bio (studente)
  const bio = 'Studente appassionato di matematica e scienze.';

  // MOCK: ruolo utente (in futuro da context o API)
  const userRole = 'student'; // Cambia in 'tutor' per testare il controllo

  // Se non è studente, mostra messaggio di errore/debug
  if (userRole !== 'student') {
    return (
      <MobileOnlyView>
        <View style={defaultStyle.container}>
          <Header />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
              Accesso negato: questa pagina è riservata agli studenti.
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

        {/* Body principale: personalizzazione profilo studente (debug) */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}>
          {/* Titolo */}
          <Text style={{ color: '#43a047', fontSize: 22, fontWeight: 'bold', marginBottom: 18 }}>👨‍🎓 Personalizza il tuo profilo Studente</Text>

          {/* Form modifica dati utente */}
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
            {/* Pulsante salva (non funzionante, solo UI) */}
            <Button title="Salva modifiche" color="#43a047" onPress={() => {}} />
          </View>

          {/* Sezione bio (solo visualizzazione per studente) */}
          <View style={{ backgroundColor: '#181f1f', borderRadius: 16, padding: 20, width: '100%' }}>
            <Text style={{ color: '#efeff2', fontSize: 16, marginBottom: 8 }}>Bio</Text>
            <Text style={{ color: '#aaa', fontStyle: 'italic' }}>{bio}</Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}