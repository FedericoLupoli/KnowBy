import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';


export default function HomeScreen() {

  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('home');

   const [tutors, setTutors] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('http://66.118.245.111:3000/api/tutors');
        const data = await response.json();
        setTutors(data.tutors);
      } catch (error) {
        setTutors([]);
        console.log(error);
      }finally {
        setLoading(false);
      }
    };
    fetchTutors();
   }, []);

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />

        {/* Corpo principale: loader o lista tutor */}
        {loading ? (
          <ActivityIndicator size="large" color="#00bfff" />
        ) : (
          <View style={{ paddingHorizontal: 16 }}>
            <FlatList
              data={tutors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={{
                    marginBottom: 18,
                    padding: 22,
                    backgroundColor: '#181f1f',
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#222',
                  }}>
                    <Text style={{ color: '#00bfff', fontWeight: 'bold', fontSize: 20, marginBottom: 4 }}>
                      👨‍🏫 {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                      {item.subject ? (
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
                          {item.subject}
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
                        {item.rating}
                      </Text>
                    </View>
                    {typeof item.hourlyRate !== 'undefined' && (
                      <Text style={{ color: '#00ff99', fontWeight: 'bold', fontSize: 15, marginBottom: 4 }}>
                        € {item.hourlyRate}/h
                      </Text>
                    )}
                    <Text style={{ color: '#aaa', fontStyle: 'italic', marginTop: 2 }}>
                      {item.bio}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        )}

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}