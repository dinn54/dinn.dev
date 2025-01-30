// contexts/I18nContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json'
import kr from './kr.json'

// i18n 초기화
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    kr: { translation: kr },
  },
  lng: 'en',
  fallbackLng: 'en',
});

type I18nContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode, initialLang: string }> = ({ children, initialLang }) => {
  const [language, setLanguage] = useState(initialLang);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
