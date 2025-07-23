import React from 'react';
import { View, Text } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

// Body centrale della pagina principale (placeholder)
const Body = () => {
  const { language } = useLanguage();
  
  return (
    <View style={defaultStyle.body}>
      <Text style={defaultStyle.bodyText}>{translations[language].body.placeholder}</Text>
    </View>
  );
};

export default Body; 