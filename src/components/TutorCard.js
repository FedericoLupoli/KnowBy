import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TutorCard({ tutor }) {
  const handleMessage = () => {
    Alert.alert('Messaggio', `Funzione invio messaggio a ${tutor.name} (da implementare)`);
  };

  return (
    <View style={{
      marginBottom: 18,
      padding: 22,
      backgroundColor: '#181f1f',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#222',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ color: '#00bfff', fontWeight: 'bold', fontSize: 20, marginBottom: 4, flexDirection: 'row', alignItems: 'center' }}>
          👨‍🏫 {tutor.name} {tutor.pro ? <FontAwesome name="check-circle" size={18} color="#ffd700" style={{ marginLeft: 8, marginBottom: -2 }} /> : null}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          {tutor.subject ? (
            <Text style={{
              backgroundColor: '#00bfff',
              color: '#181f1f',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 2,
              fontWeight: 'bold',
              fontSize: 13,
              marginRight: 10,
            }}>
              {tutor.subject}
            </Text>
          ) : (
            <Text style={{ color: '#aaa', fontSize: 13, marginRight: 10 }}>
              Materia non specificata
            </Text>
          )}
          <Text style={{ color: '#ffd700', fontWeight: 'bold', fontSize: 15 }}>
            ★
          </Text>
          <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 2, fontSize: 15 }}>
            {tutor.rating}
          </Text>
        </View>
        {typeof tutor.hourlyRate !== 'undefined' && (
          <Text style={{ color: '#00ff99', fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>
            € {tutor.hourlyRate}/h
          </Text>
        )}
        <Text style={{ color: '#aaa', fontStyle: 'italic', marginTop: 2 }}>
          {tutor.bio}
        </Text>
      </View>
      
    </View>
  );
} 