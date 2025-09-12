import React from 'react';
import { FaTelegramPlane, FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Telegram',
    icon: FaTelegramPlane,
    url: 'https://t.me/mrshitcoin',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/mrshitcoin',
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    url: 'https://discord.gg/mrshitcoin',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/mrshitcoin',
  },
];

const SocialMedia = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
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
                <social.icon className="social-icon w-8 h-8 md:w-10 md:h-10" />
                <span className="mt-2 text-sm text-gray-600 group-hover:text-primary transition-colors duration-300">
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