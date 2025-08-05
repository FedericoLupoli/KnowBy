import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileLogin from "./src/screens/ProfileLogin";
import ProfilePage from "./src/screens/ProfilePage";
import SettingsPage from "./src/screens/SettingsScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";

import * as Font from "expo-font";
import { LoaderSplash } from "./src/components/Header";
import ProfileRegister from "./src/screens/ProfileRegister";
import SearchScreen from "./src/screens/SearchScreen";
import DebugScreen from "./src/screens/DebugScreen";
import ConversationsScreen from "./src/screens/ConversationsScreen";

const Stack = createStackNavigator();

// Componente interno che ha accesso ai context
function AppNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoaderSplash />;
  }

  return (
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
        <Stack.Screen name="DebugScreen" component={DebugScreen} />
        <Stack.Screen name="ConversationsScreen" component={ConversationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      KBFONT: require("./assets/fonts/Aladin-Regular.ttf"),
      Khonsu: require("./assets/fonts/Khonsu.ttf"),
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
        <AppNavigator />
      </AuthProvider>
    </LanguageProvider>
  );
}
