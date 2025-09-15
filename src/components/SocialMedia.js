import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaTelegramPlane, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Telegram',
    icon: FaTelegramPlane,
    url: 'https://t.me/mrshitcointz',
    color: '#37AEE2', // Telegram blue
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/mrshitcointz',
    color: '#1DA1F2', // Twitter blue
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    url: 'https://facebook.com/mrshitcointz',
    color: '#1877F2', // Facebook blue
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/mrshitcointz/',
    color: '#E1306C', // Instagram-ish magenta
  },
];

const SocialMedia = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className={`text-3xl font-bold mb-8 ${isHome ? 'text-orange-500' : ''}`}>Connect With Me</h2>
        <div className="flex justify-center space-x-8 md:space-x-12">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full p-3 md:p-4 mb-2"
                  style={{
                    boxShadow: `0 6px 18px ${social.color}33`, // colored shadow (20% alpha)
                  }}
                >
                  <social.icon
                    className="w-6 h-6 md:w-8 md:h-8"
                    style={{ color: social.color }}
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: social.color }}
                >
                  {social.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;