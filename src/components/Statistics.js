import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';

const Statistics = () => {
  const { getText } = useContext(LanguageContext);

  const stats = [
    {
      number: '10,000+',
      label: getText('students'),
    },
    {
      number: '50,000+',
      label: getText('visitors'),
    },
    {
      number: '5,000+',
      label: getText('booksSold'),
    },
  ];

  const parseNumber = (str) => {
    return parseInt(str.replace(/[^\d]/g, ''), 10);
  };

  const formatNumber = (num) => {
    return num.toLocaleString() + '+';
  };

  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    const targetNum = parseNumber(target);

    useEffect(() => {
      const increment = Math.ceil(targetNum / 50); // Adjust speed here
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev >= targetNum) {
            clearInterval(timer);
            return targetNum;
          }
          return prev + increment;
        });
      }, 50); // 50ms interval

      return () => clearInterval(timer);
    }, [targetNum]);

    return <span>{formatNumber(count)}</span>;
  };
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
              >
                <h3 className="text-5xl font-bold text-white mb-2">
                  <Counter target={stat.number} />
                </h3>
                <p className="text-white/80 text-lg">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;