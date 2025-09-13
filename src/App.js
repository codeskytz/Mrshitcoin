import React, { useState } from 'react';
import { Element } from 'react-scroll';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import About from './components/About';
import SocialMedia from './components/SocialMedia';
import Statistics from './components/Statistics';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-white dark:bg-dark-950 text-dark-900 dark:text-dark-50 transition-colors duration-300">
          <Navbar />
          
          <Element name="home">
            <Hero />
          </Element>

          <Element name="products">
            <Products />
          </Element>

          <Element name="services">
            <Services />
          </Element>

          <Element name="about">
            <About />
          </Element>

          <SocialMedia />
          <Statistics />
          
          <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
