import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import defaultStyle from '../styles/defaultStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileOnlyView from '../components/MobileOnlyView';
import TutorCard from '../components/TutorCard';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

export default function SearchScreen() {
  const { language } = useLanguage();
  const [activeIcon, setActiveIcon] = useState('search');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      let url = 'http://66.118.245.111:3000/api/tutors?';
      const params = [];
      if (name) params.push(`name=${encodeURIComponent(name)}`);
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (location) params.push(`location=${encodeURIComponent(location)}`);
      if (rating) params.push(`rating=${encodeURIComponent(rating)}`);
      url += params.join('&');
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || translations[language].search.searchError);
      } else {
        const tutors = data.tutors || [];
        const sorted = [...tutors].sort((a, b) => {
          if ((b.pro ? 1 : 0) !== (a.pro ? 1 : 0)) return (b.pro ? 1 : 0) - (a.pro ? 1 : 0);
          return (b.rating || 0) - (a.rating || 0);
        });
        setResults(sorted);
      }
    } catch (_e) {
      setError(translations[language].search.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        <Header />
        <View style={{ padding: 18 }}>
          <Text style={{ color: '#00bfff', fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>🔍 {translations[language].search.title}</Text>
          <TextInput
            style={{
              backgroundColor: '#2e3838', color: '#efeff2', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#00bfff',
            }}
            placeholder={translations[language].search.namePlaceholder}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{
              backgroundColor: '#2e3838', color: '#efeff2', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#00bfff',
            }}
            placeholder={translations[language].search.subjectPlaceholder}
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={{
              backgroundColor: '#2e3838', color: '#efeff2', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#00bfff',
            }}
            placeholder={translations[language].search.locationPlaceholder}
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={{
              backgroundColor: '#2e3838', color: '#efeff2', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#00bfff',
            }}
            placeholder={translations[language].search.ratingPlaceholder}
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />
          <Button title={loading ? translations[language].search.searching : translations[language].search.search} color="#00bfff" onPress={handleSearch} disabled={loading || (!name && !subject && !location && !rating)} />
          {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#00bfff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 20 }}
            renderItem={({ item }) => <TutorCard tutor={item} />}
          />
        )}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
} 