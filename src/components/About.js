import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
              <p className="text-white font-bold text-xl">5+ Years Experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6">About Mr Shitcoin</h2>
            <p className="text-gray-600 mb-6">
              Hey there! I'm Mr Shitcoin, your guide in the wild world of meme coin trading. 
              After years of riding the crypto waves and making both fortunes and mistakes, 
              I've mastered the art of trading these volatile digital assets.
            </p>
            <p className="text-gray-600 mb-8">
              My journey began in 2017 when I first discovered the potential of meme coins. 
              Since then, I've developed successful trading strategies and helped thousands 
              of students navigate this exciting market.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Mission</h4>
                <p className="text-gray-600">To make meme coin trading accessible and profitable for everyone</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Vision</h4>
                <p className="text-gray-600">Building the largest community of successful meme coin traders</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;