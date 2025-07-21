import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import defaultStyle from '../styles/defaultStyle';

const InfoApp = ({ version, label }) => (
  <View style={defaultStyle.section}>
    <Text style={defaultStyle.label}><FontAwesome name='copyright' size={28}/>    {label}</Text>
    <Text style={defaultStyle.info}>{`KnowBy v${version}\nMade by Federico Lupoli`}</Text>
  </View>
);

export default InfoApp; 