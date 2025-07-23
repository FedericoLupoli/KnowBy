import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('it');
  const toggleLanguage = () => setLanguage((prev) => (prev === 'it' ? 'en' : 'it'));
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Se il context non è disponibile, restituisce valori di default
    return {
      language: 'it',
      toggleLanguage: () => {}
    };
  }
  return context;
}; 