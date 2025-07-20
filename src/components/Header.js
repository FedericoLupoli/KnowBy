import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import defaultStyle from '../styles/defaultStyle';

// Header della pagina principale con gradient e titolo
const Header = () => (
  <LinearGradient
    colors={['#43a047', '#232b2b']}
    style={defaultStyle.header}
    start={{ x: 0, y: 0.3 }}
    end={{ x: 0, y: 1 }}
  >
    <Text style={defaultStyle.headerText}>KnowBy</Text>
  </LinearGradient>
);

export default Header; 