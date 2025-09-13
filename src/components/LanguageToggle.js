import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage, getText } = useContext(LanguageContext);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleLanguage}
        className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
      >
        {currentLanguage === 'en' ? '🇹🇿 Swahili' : '🇬🇧 English'}
      </button>
    </div>
  );
};

export default LanguageToggle;