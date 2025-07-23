import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

const AuthErrorBanner = () => {
  const { authError, clearAuthError } = useAuth();
  const { language } = useLanguage();

  if (!authError) return null;

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'SESSION_EXPIRED':
        return translations[language].auth.sessionExpired;
      case 'AUTH_FAILED':
        return translations[language].auth.authenticationFailed;
      case 'CONNECTION_TIMEOUT':
        return translations[language].auth.connectionTimeout;
      case 'NETWORK_ERROR':
        return translations[language].auth.networkError;
      case 'STORAGE_ERROR':
        return translations[language].auth.storageError;
      default:
        return authError; // Fallback per messaggi custom
    }
  };

  return (
    <View style={{
      backgroundColor: '#d32f2f',
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#b71c1c'
    }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="exclamation-triangle" size={16} color="#fff" style={{ marginRight: 8 }} />
        <Text style={{ 
          color: '#fff', 
          fontSize: 14, 
          fontWeight: '500',
          flex: 1,
          flexWrap: 'wrap'
        }}>
          {getErrorMessage(authError)}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={clearAuthError}
        style={{ marginLeft: 8, padding: 4 }}
        activeOpacity={0.7}
      >
        <FontAwesome name="times" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AuthErrorBanner;
