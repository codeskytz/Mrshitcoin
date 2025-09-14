import React, { createContext, useState } from 'react';

// Create translations dictionary
const translations = {
  en: {
    // Navigation
    home: 'Home',
  myStory: 'My Story',
    services: 'Services',
    products: 'Products',
    contact: 'Contact',
    exploreProducts: 'Explore Products',

    // Statistics
    statisticsTitle: 'Our Statistics',
    students: 'Students Served',
    visitors: 'Website Visitors',
    booksSold: 'Books & Courses Sold',
    experience: 'Years of Experience',
    
    // Hero section
    heroTitle: 'Welcome to ',
    heroSubtitle: 'Your trusted partner in cryptocurrency trading',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    cryptoTrader: 'Professional Crypto Trader',
    
  // ...existing code...
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    missionText: 'To make cryptocurrency trading accessible and profitable for everyone',
    visionText: 'Building the largest community of successful crypto traders',
    
    // Services section
    servicesTitle: 'Our Services',
    tradingService: 'Cryptocurrency Trading',
    consultingService: 'Expert Consulting',
    walletService: 'Secure Wallet Solutions',
    tradingBooks: 'Trading Books',
    videoCourses: 'Video Courses',
    signalGroups: 'Signal Groups',
    tradingBots: 'Trading Bots',
    
    // Products section
    productsTitle: 'Our Products',
    productDesc: 'Everything you need to succeed in crypto trading',
    
    // Features
    features: 'Features',
    strategy: 'Complete Trading Strategy',
    riskManagement: 'Risk Management',
    marketInsights: 'Market Insights',
    
    // Chatbot
    chatbotTitle: 'Chat with Us',
    chatbotPlaceholder: 'Type your message here...',
    sendMessage: 'Send',
    
    // Theme toggle
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    
    // Language toggle
    language: 'Language',
    selectLanguage: 'Select Language'
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
  myStory: 'Hadithi Yangu',
    services: 'Huduma',
    products: 'Bidhaa',
    contact: 'Wasiliana',
    exploreProducts: 'Chunguza Bidhaa',

    // Statistics
    statisticsTitle: 'Takwimu Zetu',
    students: 'Wanafunzi Waliohudumiwa',
    visitors: 'Wageni wa Tovuti',
    booksSold: 'Vitabu na Kozi Zilizoouzwa',
    experience: 'Miaka ya Uzoefu',
    
    // Hero section
    heroTitle: 'Karibu kwa ',
    heroSubtitle: 'Mshirika wako wa kuaminika katika biashara ya sarafu za kidijitali',
    getStarted: 'Anza Sasa',
    learnMore: 'Jifunze Zaidi',
    cryptoTrader: 'Mchuuzi wa Kitaalamu wa Sarafu za Kidijitali',
    
  // ...existing code...
    ourMission: 'Dhamira Yetu',
    ourVision: 'Maono Yetu',
    missionText: 'Kufanya biashara ya sarafu za kidijitali kufikika na yenye faida kwa kila mtu',
    visionText: 'Kujenga jumuiya kubwa ya wafanyabiashara wenye mafanikio wa sarafu za kidijitali',
    
    // Services section
    servicesTitle: 'Huduma Zetu',
    tradingService: 'Biashara ya Sarafu za Kidijitali',
    consultingService: 'Ushauri wa Kitaalam',
    walletService: 'Suluhisho za Pochi Salama',
    tradingBooks: 'Vitabu vya Biashara',
    videoCourses: 'Kozi za Video',
    signalGroups: 'Vikundi vya Ishara',
    tradingBots: 'Roboti za Biashara',
    
    // Products section
    productsTitle: 'Bidhaa Zetu',
    productDesc: 'Kila kitu unachohitaji kufanikiwa katika biashara ya sarafu za kidijitali',
    
    // Features
    features: 'Vipengele',
    strategy: 'Mkakati Kamili wa Biashara',
    riskManagement: 'Usimamizi wa Hatari',
    marketInsights: 'Ufahamu wa Soko',
    
    // Chatbot
    chatbotTitle: 'Ongea Nasi',
    chatbotPlaceholder: 'Andika ujumbe wako hapa...',
    sendMessage: 'Tuma',
    
    // Theme toggle
    lightMode: 'Hali ya Mwanga',
    darkMode: 'Hali ya Giza',
    
    // Language toggle
    language: 'Lugha',
    selectLanguage: 'Chagua Lugha'
  }
};

// Create the context
export const LanguageContext = createContext();

// Create the provider component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const toggleLanguage = () => {
    setCurrentLanguage(prevLang => prevLang === 'en' ? 'sw' : 'en');
  };

  const getText = (key) => {
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, getText }}>
      {children}
    </LanguageContext.Provider>
  );
};