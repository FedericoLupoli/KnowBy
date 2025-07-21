import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

// Stili per la pagina di login
const loginStyle = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232b2b',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    color: '#efeff2',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#2e3838',
    color: '#efeff2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#43a047',
  },
  button: {
    backgroundColor: '#43a047',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#efeff2',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default function ProfileLogin() {
  // Stato lingua globale
  const { language } = useLanguage();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('user');
  // Stato per i campi di input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Accesso al context di autenticazione
  // Hook di navigazione
  const navigation = useNavigation();

  // Funzione di login (debug: admin/admin)
  const handleRegister = () => {
    
  };

  const handleLogingPage = () => {
    alert('Navigation to Login Form');
  }

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />

        {/* Body principale: form di login */}
        <View style={loginStyle.container}>
          <Text style={[loginStyle.title, {marginTop: -150}]}>{translations[language].loginTitle}</Text>
          <TextInput
            style={loginStyle.input}
            placeholder='Username'
            value={email}
            onChangeText={setUsername}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="username"
          />
          <TextInput
            style={loginStyle.input}
            placeholder={translations[language].email}
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={loginStyle.input}
            placeholder={translations[language].password}
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            secureTextEntry={true}
          />

          <Button
            style={loginStyle.button}
            title={translations[language].register}
            onPress={handleRegister}
          />
          <Button 
            style={loginStyle.button}
            title={translations[language].yesAccLog}
            onPress={handleLogingPage}
          />
        </View>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
} 