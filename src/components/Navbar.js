import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LanguageContext } from '../contexts/LanguageContext';
const Link = ScrollLink;

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
  // Only track active section on home page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = ['home', 'products', 'services', 'contact'];
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
  }, [location]);

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
      className={
        'fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-out ' +
        (isScrolled
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-soft border-b border-gray-200/50 dark:border-dark-700/50'
          : 'bg-transparent')
      }
    >
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          
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
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
                <span className="text-white font-bold text-lg sm:text-xl"><img src="https://i.ibb.co/6RhNLL05/images.png" alt="Mrshitcoin as a poorr guy" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
</span>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-dark-900 dark:text-dark-50 group-hover:text-primary transition-colors duration-300">
                Mr Shitcoin
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <div className="flex items-center space-x-1">
              {/* Show only Home and My Story on /my-story */}
              {location.pathname === '/my-story' ? (
                <>
                  <RouterLink
                    to="/"
                    className="nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out text-dark-600 dark:text-dark-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={closeMobileMenu}
                  >
                    {getText('home')}
                  </RouterLink>
                  <span
                    className="nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out text-primary bg-primary/10 shadow-inner-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    My Story
                  </span>
                </>
              ) : (
                <>
                  <NavLink to="home" label={getText('home')} isActive={activeSection === 'home'} onClick={closeMobileMenu} />
                  <NavLink to="products" label={getText('products')} isActive={activeSection === 'products'} onClick={closeMobileMenu} />
                  <NavLink to="services" label={getText('services')} isActive={activeSection === 'services'} onClick={closeMobileMenu} />
                  <RouterLink to="/my-story" className="nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out text-dark-600 dark:text-dark-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    My Story
                  </RouterLink>
                  <NavLink to="contact" label={getText('contact')} isActive={activeSection === 'contact'} onClick={closeMobileMenu} />
                </>
              )}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
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
              className={
                'lg:hidden relative z-110 p-2 rounded-xl transition-all duration-300 ' +
                (isMobileMenuOpen
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-gray-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-700') +
                ' focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 touch-manipulation select-none min-h-[44px] min-w-[44px]'
              }
              style={{ minWidth: 44, minHeight: 44 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex flex-col items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -2
                  }}
                  className="block h-0.5 w-6 sm:w-7 bg-current transition-all duration-300"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? -10 : 0
                  }}
                  className="block h-0.5 w-6 sm:w-7 bg-current transition-all duration-300 mt-1"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 2
                  }}
                  className="block h-0.5 w-6 sm:w-7 bg-current transition-all duration-300 mt-1"
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
              className="fixed inset-x-0 top-0 z-100 lg:hidden overflow-y-auto min-h-screen"
            >
              <div className="bg-white dark:bg-dark-900 shadow-2xl border-b border-gray-200 dark:border-dark-700">
                {/* Mobile menu header */}
                <div className="px-2 pt-14 pb-6 sm:px-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base sm:text-lg font-semibold text-dark-900 dark:text-dark-50">
                      Navigation
                    </h2>
                    <ThemeToggle className="sm:hidden" />
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="space-y-1">
                    {location.pathname === '/my-story' ? (
                      <>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0 } }}>
                          <RouterLink
                            to="/"
                            className="flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-manipulation min-h-[56px] select-none text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800 active:bg-gray-200 dark:active:bg-dark-700 text-base sm:text-lg"
                            onClick={closeMobileMenu}
                          >
                            <span className="text-xl" role="img" aria-hidden="true">🏠</span>
                            <span className="font-medium text-base">Home</span>
                          </RouterLink>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}>
                          <span className="flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-manipulation min-h-[56px] select-none bg-primary text-white shadow-glow text-base sm:text-lg">
                            <span className="text-xl" role="img" aria-hidden="true">📖</span>
                            <span className="font-medium text-base">My Story</span>
                          </span>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0 } }}>
                          <MobileNavLink to="home" label="Home" icon="🏠" isActive={activeSection === 'home'} onClick={closeMobileMenu} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}>
                          <MobileNavLink to="products" label="Products" icon="📦" isActive={activeSection === 'products'} onClick={closeMobileMenu} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
                          <MobileNavLink to="services" label="Services" icon="💼" isActive={activeSection === 'services'} onClick={closeMobileMenu} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
                          <RouterLink to="/my-story" className="flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-manipulation min-h-[56px] select-none text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800 active:bg-gray-200 dark:active:bg-dark-700 text-base sm:text-lg">
                            <span className="text-xl" role="img" aria-hidden="true">📖</span>
                            <span className="font-medium text-base">My Story</span>
                          </RouterLink>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}>
                          <MobileNavLink to="contact" label="Contact" icon="📞" isActive={activeSection === 'contact'} onClick={closeMobileMenu} />
                        </motion.div>
                      </>
                    )}
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
                      className="btn btn-primary w-full justify-center cursor-pointer text-base sm:text-lg"
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
const NavLink = ({ to, label, isActive, onClick }) => {
  const location = useLocation();
  // Use ScrollLink only on home page, otherwise use RouterLink
  const isHome = location.pathname === '/';
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      {isHome ? (
        <ScrollLink
          to={to}
          smooth={true}
          duration={500}
          offset={-80}
          onClick={onClick}
          className={
            'nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out ' +
            (isActive ? 'text-primary bg-primary/10 shadow-inner-glow' : 'text-dark-600 dark:text-dark-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-800') +
            ' focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          }
        >
          {label}
          {isActive && (
            <motion.div layoutId="activeIndicator" className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
        </ScrollLink>
      ) : (
        <RouterLink
          to={to === 'home' ? '/' : `/${to}`}
          className={
            'nav-link relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ease-out ' +
            (isActive ? 'text-primary bg-primary/10 shadow-inner-glow' : 'text-dark-600 dark:text-dark-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-800') +
            ' focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          }
          onClick={onClick}
        >
          {label}
          {isActive && (
            <motion.div layoutId="activeIndicator" className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
        </RouterLink>
      )}
    </motion.div>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, label, icon, isActive, onClick }) => {
  // Use RouterLink for /my-story, ScrollLink for others
  return (
    to === 'my-story' ? (
      <RouterLink
        to="/my-story"
        className={
          'flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-manipulation min-h-[60px] select-none ' +
          (isActive ? 'bg-primary text-white shadow-glow' : 'text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800 active:bg-gray-200 dark:active:bg-dark-700')
        }
        onClick={onClick}
      >
        <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
        <span className="font-medium text-base">{label}</span>
        {isActive && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-2 h-2 bg-white rounded-full" />
        )}
      </RouterLink>
    ) : (
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        offset={-80}
        onClick={onClick}
        className={
          'flex items-center space-x-3 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out touch-manipulation min-h-[60px] select-none ' +
          (isActive ? 'bg-primary text-white shadow-glow' : 'text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800 active:bg-gray-200 dark:active:bg-dark-700')
        }
      >
        <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
        <span className="font-medium text-base">{label}</span>
        {isActive && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-2 h-2 bg-white rounded-full" />
        )}
      </ScrollLink>
    )
  );
};

export default Navbar;