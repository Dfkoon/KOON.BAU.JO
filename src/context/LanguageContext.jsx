/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar');

    useEffect(() => {
        localStorage.setItem('language', language);
        // document.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = (key) => {
        if (!translations[language]) {
            console.warn(`Language '${language}' not found in translations, falling back to 'ar'`);
            return translations['ar']?.[key] || key;
        }
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
