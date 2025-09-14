import React, { useEffect, useState, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const { getText } = useContext(LanguageContext);

  // Progressive enhancement for animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : 0.4
      }
    }
  };

  const floatingVariants = prefersReducedMotion ? {} : {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-br from-white via-gray-50 to-gray-100
                 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800
                 transition-colors duration-500"
      role="banner"
      aria-label="Mr Shitcoin Hero Section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="20"
                cy="20"
                r="1.5"
                fill="currentColor"
                className="text-primary/20 dark:text-primary/10"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-fluid-lg">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-fluid-lg xl:gap-fluid-2xl items-center min-h-screen lg:min-h-0"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-fluid-md order-2 lg:order-1">
            
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                               bg-primary/10 text-primary border border-primary/20
                               dark:bg-primary/20 dark:border-primary/30
                               backdrop-blur-sm transition-all duration-300
                               hover:bg-primary/20 dark:hover:bg-primary/30"
                    role="status"
                    aria-label="Professional crypto trader">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
                {getText('tradingService')}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-fluid-4xl sm:text-fluid-5xl font-heading font-bold
                           text-dark-900 dark:text-dark-50 leading-tight">
                {getText('heroTitle')}{' '}
                <span className="relative inline-block">
                  <span className="text-primary glow-text">Mr Shitcoin</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-400 to-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isVisible ? 1 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 1, delay: prefersReducedMotion ? 0 : 1 }}
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-fluid-lg sm:text-fluid-xl text-dark-600 dark:text-dark-300 
                       max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {getText('heroSubtitle')}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 py-4"
            >
              {[
                { value: '10K+', label: 'Students' },
                { value: '5+', label: 'Years Experience' },
                { value: '95%', label: 'Success Rate' }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center"
                  role="group"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-500 dark:text-dark-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <a
                  href="/my-story"
                  className="btn btn-primary w-full sm:w-auto text-base px-8 py-4 shadow-glow hover:shadow-glow-lg transition-all duration-300 focus:ring-4 focus:ring-primary/20 touch-manipulation select-none min-h-[56px] font-bold"
                  aria-label="Go to My Story"
                >
                  My Story
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-gray-200 dark:border-dark-700"
            >
              <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 text-center lg:text-left">
                {getText('aboutDescription')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-60">
                {/* Trust badges/logos would go here */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Verified Expert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">5★ Rated</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              variants={imageVariants}
              {...floatingVariants}
              className="relative max-w-lg w-full"
            >
              <div className="relative z-10">
                <img
                  src="https://i.ibb.co/JFWFGRcb/Picsart-25-09-13-03-38-37-876.png"
                  alt="Mr Shitcoin - Professional cryptocurrency trader with expertise in meme coin trading"
                  className="w-full h-auto max-w-md mx-auto lg:max-w-lg xl:max-w-xl
                           filter drop-shadow-2xl
                           transition-all duration-500
                           hover:scale-102 hover:drop-shadow-xl
                           object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
              
              {/* Background Glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-20
                            bg-gradient-radial from-primary via-primary/30 to-transparent
                            transform scale-110"
                   aria-hidden="true" />

              {/* Floating Elements */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute top-8 right-8 lg:top-12 lg:right-12 w-12 h-12 lg:w-16 lg:h-16
                             bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20
                             flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                  >
                    <span className="text-primary text-lg lg:text-2xl">₿</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 w-10 h-10 lg:w-12 lg:h-12
                             bg-success/10 rounded-full backdrop-blur-sm border border-success/20
                             flex items-center justify-center"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    <span className="text-success text-sm lg:text-lg">📈</span>
                  </motion.div>

                  <motion.div
                    className="absolute top-20 left-4 lg:top-24 lg:left-8 w-8 h-8 lg:w-10 lg:h-10
                             bg-warning/10 rounded-full backdrop-blur-sm border border-warning/20
                             flex items-center justify-center"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    <span className="text-warning text-xs lg:text-sm">🚀</span>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2, duration: prefersReducedMotion ? 0.1 : 0.8 }}
      >
        <button
          onClick={() => {
            const aboutElement = document.getElementById('about');
            aboutElement?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center space-y-2 text-dark-400 hover:text-primary
                   transition-colors duration-300 focus:outline-none focus:text-primary
                   touch-manipulation select-none p-2"
          aria-label="Scroll to about section"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;