import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SocialLinks = ({ socialLinks }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
    {socialLinks.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          console.log(`Apertura link: ${item.label}`);
          Linking.openURL(item.url);
        }}
        activeOpacity={0.7}
        style={{ marginHorizontal: 8 }}
      >
        <FontAwesome name={item.label} size={28} color="#efeff2" />
      </TouchableOpacity>
    ))}
  </View>
);

export default SocialLinks; 