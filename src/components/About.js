import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';

const About = () => {
  const { getText } = useContext(LanguageContext);
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="/trader-image.jpg"
                alt="Mr Shitcoin Trading"
                className="rounded-xl object-cover shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-xl p-4 shadow-lg">
              <p className="text-white font-bold text-xl">{getText('tradingService')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6">{getText('aboutTitle')}</h2>
            <p className="text-gray-600 mb-6">{getText('aboutDescription')}</p>
            <p className="text-gray-600 mb-8">
              {getText('productDesc')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">{getText('ourMission')}</h4>
                <p className="text-gray-600">{getText('missionText')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">{getText('ourVision')}</h4>
                <p className="text-gray-600">{getText('visionText')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;