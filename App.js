import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileLogin from './src/screens/ProfileLogin';
import ProfilePage from './src/screens/ProfilePage';
import ProfilePageTutor from './src/screens/ProfilePageTutor';
import SettingsPage from './src/screens/SettingsScreen';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';

import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'KBFONT': require('./assets/fonts/Aladin-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

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
            <Stack.Screen name="ProfileLogin" component={ProfileLogin} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="ProfilePageTutor" component={ProfilePageTutor} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
  );
} 