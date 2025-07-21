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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Stili per la pagina di login
const loginStyle = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
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
    borderColor: '#00bfff',
  },
  button: {
    backgroundColor: '#00bfff',
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

export default function ProfileRegister() {
  const { language } = useLanguage();
  const [activeIcon, setActiveIcon] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (role === 'tutor' && !subject.trim()) {
      alert('La materia è obbligatoria per i tutor');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://66.118.245.111:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, bio: role === 'tutor' ? bio : undefined, subject: role === 'tutor' ? subject : undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Errore durante la registrazione');
      } else {
        await AsyncStorage.setItem('jwtToken', data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        alert('Registrazione avvenuta con successo!');
        navigation.replace('ProfilePage');
      }
    } catch (e) {
      alert('Errore di rete');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPage = () => {
    navigation.replace('ProfileLogin');
  };

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>
          <Text style={{ color: '#efeff2', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', marginTop: -150 }}>
            {translations[language].registerTitle || 'Registrati'}
          </Text>
          <TextInput
            style={loginStyle.input}
            placeholder='Nome'
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="words"
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
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={{ color: '#efeff2', marginBottom: 4 }}>Ruolo</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Studente" color={role === 'student' ? '#00bfff' : '#444'} onPress={() => setRole('student')} />
              <Button title="Tutor" color={role === 'tutor' ? '#00bfff' : '#444'} onPress={() => setRole('tutor')} />
            </View>
          </View>
          {role === 'tutor' && (
            <>
              <TextInput
                style={loginStyle.input}
                placeholder="Materia (obbligatoria)"
                value={subject}
                onChangeText={setSubject}
                autoCorrect={false}
              />
              <TextInput
                style={loginStyle.input}
                placeholder="Bio (opzionale)"
                value={bio}
                onChangeText={setBio}
                autoCorrect={false}
                multiline
              />
            </>
          )}
          <Button
            style={loginStyle.button}
            title={loading ? 'Registrazione...' : (translations[language].register || 'Registrati')}
            onPress={handleRegister}
            disabled={loading}
          />
          <Button
            style={loginStyle.button}
            title={translations[language].yesAccLog || 'Hai già un account? Login'}
            onPress={handleLoginPage}
          />
        </View>
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
} 