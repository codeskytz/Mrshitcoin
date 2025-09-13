import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LanguageContext } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mobileMenuRef = useRef(null);
  const { getText } = useContext(LanguageContext);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section tracking
  useEffect(() => {
    const sections = ['home', 'products', 'services', 'about', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`
        fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-out
        ${isScrolled 
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-soft border-b border-gray-200/50 dark:border-dark-700/50' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
                <span className="text-white font-bold text-lg lg:text-xl">M</span>
              </div>
              <span className="text-xl lg:text-2xl font-heading font-bold text-dark-900 dark:text-dark-50 group-hover:text-primary transition-colors duration-300">
                Mr Shitcoin
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {[
                { to: 'home', label: getText('home') },
                { to: 'products', label: getText('products') },
                { to: 'services', label: getText('services') },
                { to: 'about', label: getText('about') },
                { to: 'contact', label: getText('contact') }
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  isActive={activeSection === item.to}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <LanguageToggle />
            {/* Theme Toggle */}
            <ThemeToggle className="hidden sm:flex" />
            
            {/* CTA Button - Desktop */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:block"
            >
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="btn btn-primary text-sm px-4 py-2 cursor-pointer"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              className={`
                lg:hidden relative z-110 p-2 rounded-xl transition-all duration-300
                ${isMobileMenuOpen
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-gray-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                }
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                touch-manipulation select-none
                min-h-[44px] min-w-[44px]
              `}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex flex-col items-center justify-center w-5 h-5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -2
                  }}
                  className="block h-0.5 w-5 bg-current transition-all duration-300"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? -10 : 0
                  }}
                  className="block h-0.5 w-5 bg-current transition-all duration-300 mt-1"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 2
                  }}
                  className="block h-0.5 w-5 bg-current transition-all duration-300 mt-1"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-90 bg-dark-900/80 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="fixed inset-x-0 top-0 z-100 lg:hidden"
            >
              <div className="bg-white dark:bg-dark-900 shadow-2xl border-b border-gray-200 dark:border-dark-700">
                {/* Mobile menu header */}
                <div className="px-4 pt-16 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-dark-900 dark:text-dark-50">
                      Navigation
                    </h2>
                    <ThemeToggle className="sm:hidden" />
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="space-y-2">
                    {[
                      { to: 'home', label: 'Home', icon: '🏠' },
                      { to: 'products', label: 'Products', icon: '📦' },
                      { to: 'services', label: 'Services', icon: '💼' },
                      { to: 'about', label: 'About', icon: '👤' },
                      { to: 'contact', label: 'Contact', icon: '📞' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 }
                        }}
                      >
                        <MobileNavLink
                          to={item.to}
                          label={item.label}
                          icon={item.icon}
                          isActive={activeSection === item.to}
                          onClick={closeMobileMenu}
                        />
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.4 }
                    }}
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700"
                  >
                    <Link
                      to="services"
                      smooth={true}
                      duration={500}
                      onClick={closeMobileMenu}
                      className="btn btn-primary w-full justify-center cursor-pointer"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, label, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-80}
      onClick={onClick}
      className={`
        nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer
        transition-all duration-300 ease-out
        ${isActive
          ? 'text-primary bg-primary/10 shadow-inner-glow'
          : 'text-dark-600 dark:text-dark-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-800'
        }
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
        />
      )}
    </Link>
  </motion.div>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, label, icon, isActive, onClick }) => (
  <Link
    to={to}
    smooth={true}
    duration={500}
    offset={-80}
    onClick={onClick}
    className={`
      flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer
      transition-all duration-300 ease-out touch-manipulation
      min-h-[60px] select-none
      ${isActive
        ? 'bg-primary text-white shadow-glow'
        : 'text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800 active:bg-gray-200 dark:active:bg-dark-700'
      }
    `}
  >
    <span className="text-xl" role="img" aria-hidden="true">
      {icon}
    </span>
    <span className="font-medium text-base">
      {label}
    </span>
    {isActive && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="ml-auto w-2 h-2 bg-white rounded-full"
      />
    )}
  </Link>
);

export default Navbar;