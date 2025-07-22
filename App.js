import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileLogin from './src/screens/ProfileLogin';
import ProfilePage from './src/screens/ProfilePage';
import SettingsPage from './src/screens/SettingsScreen';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';

import * as Font from 'expo-font';
import Header, { LoaderSplash } from './src/components/Header';
import ProfileRegister from './src/screens/ProfileRegister';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      'KBFONT': require('./assets/fonts/Aladin-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    // Mostra splash per almeno 1,5s
    if (fontsLoaded) {
      const timer = setTimeout(() => setShowSplash(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    // Mostra splash screen custom finché i font non sono caricati o per almeno 1,5s
    return <LoaderSplash />;
  }

  return (
    /* LanguageProvider gestisce la lingua globale (it/en) */
    <LanguageProvider>
      {/* AuthProvider gestisce l'autenticazione */}
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ProfileLogin" component={ProfileLogin} />
            <Stack.Screen name="ProfileRegister" component={ProfileRegister} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
} 