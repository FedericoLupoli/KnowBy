import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import defaultStyle from '../styles/defaultStyle';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

const InfoApp = ({ version, label }) => {
  const { language } = useLanguage();
  
  return (
    <View style={defaultStyle.section}>
      <Text style={defaultStyle.label}><FontAwesome name='copyright' size={28}/>    {label}</Text>
      <Text style={defaultStyle.info}>{`KnowBy v${version}\n${translations[language].infoApp.madeBy}`}</Text>
      <Text style={defaultStyle.info}><FontAwesome name='cc-mastercard' size={28}/> <FontAwesome name='cc-visa' size={28}/> <FontAwesome name='cc-amex' size={28}/></Text>
    </View>
  );
};

export default InfoApp; 