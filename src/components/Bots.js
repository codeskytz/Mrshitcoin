import React from 'react';
import Navbar from './Navbar';

const bots = [
  {
    id: 'trojan',
    name: 'Trojan Bot',
    image: 'https://img.step.finance/unsafe/s-1500/plain/https%3A%2F%2Fsf-cms.step.finance%2Fassets%2F627db62c-0c64-4447-b987-346a68a53648',
    description: 'High-frequency meme-coin scalper with adjustable risk profiles.',
    link: 'https://example.com/bots/trojan/start'
  },
  {
    id: 'phoenix',
    name: 'Phoenix Bot',
    image: 'https://phonixbot.com/app-assets/phonix.png',
    description: 'Trend-following bot optimized for volatile markets.',
    link: 'https://example.com/bots/phoenix/start'
  },
  {
    id: 'hydra',
    name: 'Hydra Bot',
    image: 'https://cdn.dribbble.com/userupload/15079380/file/original-58ac0c14d85cff238b7aeeefe9064015.jpg?resize=1024x768&vertical=center',
    description: 'Multi-strategy bot with built-in signal aggregation.',
    link: 'https://example.com/bots/hydra/start'
  },
  {
    id: 'zeus',
    name: 'Zeus Bot',
    image: 'https://c.mql5.com/31/1388/zeus-market-god-logo-200x200-1753.png',
    description: 'Aggressive arbitrage and market-making bot.',
    link: 'https://example.com/bots/zeus/start'
  }
];

const Bots = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-dark-900 dark:to-dark-950 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Trading Bots</h1>
      <p className="text-center mb-8 text-gray-700 dark:text-gray-300">Choose a bot below to start automated trading instantly.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bots.map(bot => (
          <div key={bot.id} className="bg-white dark:bg-dark-900 shadow rounded-xl overflow-hidden flex flex-col">
            <img src={bot.image} alt={bot.name} className="object-cover w-full h-48" onError={e => { e.target.src = '/logo192.png'; }} />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-primary">{bot.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 mt-2">{bot.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <a href={bot.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Trade Now</a>
                <a href={`${bot.link}?demo=true`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Demo</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
);

export default Bots;
