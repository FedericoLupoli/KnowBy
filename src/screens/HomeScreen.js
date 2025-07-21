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
          <View>
            <FlatList
              data={tutors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 15, padding: 30, backgroundColor: '#222', borderRadius: 8 }}>
                  <Text style={{ color: '#00bfff', fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ color: '#fff' }}>Materia: {item.subject}</Text>
                  <Text style={{ color: '#fff' }}>Rating: {item.rating}</Text>
                  <Text style={{ color: '#aaa' }}>{item.bio}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}