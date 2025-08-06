import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';  
import { LinearGradient } from 'expo-linear-gradient';
import defaultStyle from '../styles/defaultStyle';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
// Header della pagina principale con gradient e titolo
const Header = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  // Add defensive checks
  const isUserPro = user?.pro ? true : false;
  const isUserAdmin = user?.role === 'admin';
  
  return (
    <LinearGradient
      colors={['#181a1b', '#232b2b']}
      style={[defaultStyle.header, { backgroundColor: 'transparent' }]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={require('../../assets/icons/scritta.png')} 
            alt="Logo" 
            style={{ width: 150, height: 100, marginRight: -3 }} 
            resizeMode="contain"
          />
          {isUserPro ? (<Text style={defaultStyle.headerTagPro}>PRO</Text>) : null}
          {isUserAdmin ? (<Text style={defaultStyle.headerTagAdmin}>ADMIN</Text>) : null}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConversationsScreen')}
          style={{ borderRadius: 50, padding: 10 }}
          activeOpacity={0.7}
        >
          <FontAwesome name="commenting" size={20} color="#ff3c00ff" />
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
      <Image 
        source={require('../../assets/icons/scritta.png')} 
        alt="Logo" 
        style={{ height: 100, marginBottom: 20 }} 
        resizeMode="contain"
      />
      <Text style={{ color: '#efeff2', fontSize: 18, opacity: 0.7 }}>
        {language === 'en' ? 'Loading...' : 'Caricamento...'}
      </Text>
    </LinearGradient>
  );
};

export default Header; 