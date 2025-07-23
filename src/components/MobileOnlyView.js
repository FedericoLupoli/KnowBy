import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

const { width, height } = Dimensions.get('window');
const isTablet = Math.min(width, height) >= 600;


export default function MobileOnlyView({ children }) {
  const { language } = useLanguage();
  
  if (
    Platform.OS === 'web' ||
    (Platform.OS === 'ios' && Platform.isPad) ||
    isTablet
  ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232b2b' }}>
        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', padding: 24 }}>
          {translations[language].mobileOnly.message}
        </Text>
      </View>
    );
  }
  // Se mobile, mostra i children (cioè la pagina vera e propria)
  return children;
} 