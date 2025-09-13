import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, VideoCameraIcon, BellIcon, CpuChipIcon, CheckIcon } from '@heroicons/react/24/outline';
import { LanguageContext } from '../contexts/LanguageContext';

const ServicesComponent = () => {
  const { getText } = useContext(LanguageContext);

  const services = [
  {
    title: getText('tradingBooks'),
    description: getText('aboutDescription'),
    icon: BookOpenIcon,
    price: '$49.99',
    originalPrice: '$79.99',
    features: [
      getText('strategy'),
      getText('riskManagement'),
      getText('marketInsights'),
      getText('tradingService'),
      getText('consultingService')
    ],
    popular: false,
  },
  {
    title: getText('videoCourses'),
    description: getText('productDesc'),
    icon: VideoCameraIcon,
    price: '$199.99',
    originalPrice: '$299.99',
    features: [
      getText('strategy'),
      getText('tradingService'),
      getText('marketInsights'),
      getText('consultingService'),
      getText('riskManagement')
    ],
    popular: true,
  },
  {
    title: getText('signalGroups'),
    description: getText('productDesc'),
    icon: BellIcon,
    price: '$99',
    period: '/month',
    originalPrice: '$149/month',
    features: [
      getText('tradingService'),
      getText('marketInsights'),
      getText('strategy'),
      getText('riskManagement'),
      getText('consultingService')
    ],
    popular: false,
  },
  {
    title: getText('tradingBots'),
    description: getText('aboutDescription'),
    icon: CpuChipIcon,
    price: '$299.99',
    originalPrice: '$499.99',
    features: [
      getText('strategy'),
      getText('tradingService'),
      getText('riskManagement'),
      getText('marketInsights'),
      getText('consultingService')
    ],
    popular: false,
  },
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section 
      id="services"
      className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50
                 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900
                 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 dark:text-dark-50 mb-4">
            {getText('servicesTitle')}
          </h2>
          <p className="text-gray-600 dark:text-dark-300 max-w-3xl mx-auto text-lg">
            {getText('productDesc')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`
                relative crypto-card p-8 h-full flex flex-col
                ${service.popular 
                  ? 'ring-2 ring-primary shadow-glow border-primary/20 transform scale-105' 
                  : 'hover:shadow-xl'
                }
                transition-all duration-300 hover:transform hover:scale-102
              `}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`
                  p-4 rounded-2xl
                  ${service.popular 
                    ? 'bg-primary text-white' 
                    : 'bg-primary/10 text-primary'
                  }
                `}>
                  <service.icon className="h-8 w-8" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-center mb-3 text-dark-900 dark:text-dark-50">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-dark-300 text-center mb-6 flex-grow">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    {service.price}
                  </span>
                  {service.period && (
                    <span className="text-gray-500 dark:text-dark-400">
                      {service.period}
                    </span>
                  )}
                </div>
                {service.originalPrice && (
                  <span className="text-gray-400 dark:text-dark-500 line-through text-sm">
                    {service.originalPrice}
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckIcon className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-dark-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-3 px-6 rounded-xl font-medium transition-all duration-300
                    ${service.popular
                      ? 'btn btn-primary shadow-glow hover:shadow-glow-lg'
                      : 'btn btn-outline hover:btn-primary'
                    }
                  `}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 p-8 bg-white dark:bg-dark-800 rounded-2xl shadow-soft"
        >
          <h3 className="text-2xl font-bold text-dark-900 dark:text-dark-50 mb-4">
            {getText('servicesTitle')}
          </h3>
          <p className="text-gray-600 dark:text-dark-300 mb-6 max-w-2xl mx-auto">
            {getText('aboutDescription')}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline hover:btn-primary"
          >
            {getText('getStarted')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesComponent;