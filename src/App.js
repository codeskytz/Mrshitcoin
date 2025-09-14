import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
// ...existing code...
import SocialMedia from './components/SocialMedia';
import Statistics from './components/Statistics';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import MyStory from './components/MyStory';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
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
                <SocialMedia />
                <Statistics />
                <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
                <Footer />
              </div>
            } />
            <Route path="/my-story" element={<MyStory />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
