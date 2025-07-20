import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import defaultStyle from '../styles/defaultStyle';
import { useAuth } from '../context/AuthContext';
import { CommonActions, useNavigation } from '@react-navigation/native';

/**
 * Footer "volante" con pulsanti-icona.
 * Props:
 *   activeIcon: string - icona attualmente selezionata
 *   setActiveIcon: function - funzione per cambiare l'icona attiva
 */
const Footer = ({ activeIcon, setActiveIcon }) => {
  // Colori per icone attive/inattive
  const activeColor = '#43a047';
  const inactiveColor = '#efeff2';
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation();

  // Navigazione e attivazione icone
  const handleUserPress = () => {
    setActiveIcon('user');
    if (isLoggedIn) {
      navigation.navigate('ProfilePage');
    } else {
      navigation.navigate('ProfileLogin');
    }
  };

  const handleHomePress = () => {
    setActiveIcon('home');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      })
    );
  };

  const handleSettingsPress = () => {
    setActiveIcon('settings');
    navigation.navigate('SettingsPage');
  };

  return (
    <View style={defaultStyle.footer}>
      <TouchableOpacity style={defaultStyle.iconButton} onPress={handleHomePress}>
        <FontAwesome name='home' size={28} color={activeIcon === 'home' ? activeColor : inactiveColor} />
      </TouchableOpacity>
      <TouchableOpacity style={defaultStyle.iconButton} onPress={() => setActiveIcon('search')}>
        <MaterialIcons name="search" size={28} color={activeIcon === 'search' ? activeColor : inactiveColor} />
      </TouchableOpacity>
      <TouchableOpacity style={defaultStyle.iconButton} onPress={handleUserPress}>
        <FontAwesome name="user" size={28} color={activeIcon === 'user' ? activeColor : inactiveColor} />
      </TouchableOpacity>
      <TouchableOpacity style={defaultStyle.iconButton} onPress={handleSettingsPress}>
        <FontAwesome name="gear" size={28} color={activeIcon === 'settings' ? activeColor : inactiveColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer; 