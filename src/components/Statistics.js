import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    number: '10,000+',
    label: 'Students Served',
  },
  {
    number: '50,000+',
    label: 'Website Visitors',
  },
  {
    number: '5,000+',
    label: 'Books & Courses Sold',
  },
];

const Statistics = () => {
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
                <h3 className="text-5xl font-bold text-white mb-2">{stat.number}</h3>
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