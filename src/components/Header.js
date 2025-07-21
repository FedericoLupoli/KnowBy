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

// LoaderSplash: splash screen custom con logo e sfondo coerente
export const LoaderSplash = () => (
  <LinearGradient
    colors={['#232b2b', '#232b2b']}
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <Text style={{
      fontFamily: 'KBFONT',
      color: '#efeff2',
      fontSize: 64,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      marginBottom: 24,
    }}>
      KnowBy
    </Text>
  </LinearGradient>
);

export default Header; 