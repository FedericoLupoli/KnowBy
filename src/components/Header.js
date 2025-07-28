import React from 'react';
import { Text, TouchableOpacity, Alert, View } from 'react-native';  
import { LinearGradient } from 'expo-linear-gradient';
import defaultStyle from '../styles/defaultStyle';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import translations from '../utils/translations';

// Header della pagina principale con gradient e titolo
const Header = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  // Add defensive checks
  const isUserPro = user?.pro ? true : false;
  const isUserAdmin = user?.role === 'admin';
  
  return (
    <LinearGradient
      colors={['#181a1b', '#232b2b']}
      style={defaultStyle.header}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={defaultStyle.headerText}>KnowBy</Text>
          {isUserPro ? (<Text style={defaultStyle.headerTagPro}>PRO</Text>) : null}
          {isUserAdmin ? (<Text style={defaultStyle.headerTagAdmin}>ADMIN</Text>) : null}
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert(translations[language].header.commentsAlert, translations[language].header.commentsMessage)}
          style={{ borderRadius: 50, padding: 10 }}
          activeOpacity={0.7}
        >
          <FontAwesome name="envelope" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// LoaderSplash: splash screen custom con logo e sfondo coerente
export const LoaderSplash = () => {
  const { language } = useLanguage();
  
  return (
    <LinearGradient
      colors={['#181a1b', '#232b2b']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 1 }}
    >
      <Text style={{
        fontFamily: 'KBFONT',
        color: '#00bfff',
        fontSize: 64,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        marginBottom: 24,
      }}>
        KnowBy
      </Text>
      <Text style={{ color: '#efeff2', fontSize: 18, opacity: 0.7 }}>
        {language === 'en' ? 'Loading...' : 'Caricamento...'}
      </Text>
    </LinearGradient>
  );
};

export default Header; 