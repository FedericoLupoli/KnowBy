import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import TutorCard from '../components/TutorCard';
import AuthErrorBanner from '../components/AuthErrorBanner';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';


export default function HomeScreen() {
  const { language } = useLanguage();

  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState('home');

   const [tutors, setTutors] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('http://66.118.245.111:3000/api/tutors');
        const data = await response.json();
        if (!response.ok) {
          if (data.error) throw new Error(data.error);
          if (data.errors) throw new Error(data.errors.map(e => e.msg).join(', '));
          throw new Error(translations[language].home.unknownError);
        }
        // Ordina: prima pro=true, poi rating decrescente
        const sorted = [...(data.tutors || [])].sort((a, b) => {
          if ((b.pro ? 1 : 0) !== (a.pro ? 1 : 0)) return (b.pro ? 1 : 0) - (a.pro ? 1 : 0);
          return (b.rating || 0) - (a.rating || 0);
        });
        setTutors(sorted);
      } catch (error) {
        setTutors([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
   }, [language]);

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />
        
        {/* Auth Error Banner */}
        <AuthErrorBanner />

        {/* Corpo principale: loader o lista tutor */}
        {loading ? (
          <ActivityIndicator size="large" color="#00bfff" />
        ) : (
          <View style={{ paddingHorizontal: 16 }}>
            <FlatList
              data={tutors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return <TutorCard tutor={item} />;
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