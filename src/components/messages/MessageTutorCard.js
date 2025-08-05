import React from 'react';
import { View, Text } from 'react-native';
import defaultStyle from '../../styles/defaultStyle';
import { FontAwesome } from '@expo/vector-icons';

export default function MessageTutorCard({ tutor }) {

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
          <Text style={{ ...defaultStyle.text, fontWeight: 'bold', fontSize: 20, marginBottom: 4, color: '#00bfff'}}>
            {tutor.name}  {tutor.pro ? <FontAwesome name="check-circle" size={18} color="#ffd700" style={{ marginLeft: 8, marginBottom: -2 }} /> : null}
          </Text>
          <Text style={defaultStyle.buttonFooterText}>{tutor.subject}</Text>
          
        </View>
        <FontAwesome name="commenting-o" size={20} color="#ffffff" />
      </View>
  );
}
