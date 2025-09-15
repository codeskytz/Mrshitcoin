import React from 'react';
import Navbar from './Navbar';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

const groups = {
  whatsapp: [
    { id: 1, name: 'Meme Coin Daily', url: 'https://chat.whatsapp.com/EXAMPLE_INVITE_1' },
    { id: 2, name: 'Altcoin Signals', url: 'https://chat.whatsapp.com/EXAMPLE_INVITE_2' },
    { id: 3, name: 'Entry Alerts', url: 'https://chat.whatsapp.com/EXAMPLE_INVITE_3' },
  ],
  telegram: [
    { id: 1, name: 'MemeCoinChat', url: 'https://t.me/joinchat/EXAMPLE_INVITE_A' },
    { id: 2, name: 'CryptoSignalsPro', url: 'https://t.me/joinchat/EXAMPLE_INVITE_B' },
    { id: 3, name: 'TradingAlerts', url: 'https://t.me/joinchat/EXAMPLE_INVITE_C' },
  ],
};

// Use Font Awesome icons via react-icons to avoid adding external CDN
const WHATSAPP_COLOR = '#25D366';
const TELEGRAM_COLOR = '#37AEE2';

const WhatsAppIcon = ({ className = 'text-2xl' }) => (
  <FaWhatsapp className={className} style={{ color: WHATSAPP_COLOR }} />
);

const TelegramIcon = ({ className = 'text-2xl' }) => (
  <FaTelegramPlane className={className} style={{ color: TELEGRAM_COLOR }} />
);

const Signals = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-dark-900 dark:to-dark-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Signal Groups</h1>
        <p className="text-center mb-8 text-gray-700 dark:text-gray-300">Join our active WhatsApp and Telegram groups to receive timely signals and community discussion. Clicking a group will open the respective app or web client.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3"> <WhatsAppIcon className="w-7 h-7" /> <span style={{ color: WHATSAPP_COLOR }}>WhatsApp Groups</span></h2>
            <div className="space-y-3">
              {groups.whatsapp.map(g => (
                <a key={g.id} href={g.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <WhatsAppIcon className="w-8 h-8" />
                    <div>
                      <div className="font-semibold">{g.name}</div>
                      <div className="text-sm text-gray-500">WhatsApp group invite</div>
                    </div>
                  </div>
                  <div className="text-primary font-semibold">Open</div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3"> <TelegramIcon className="w-7 h-7" /> <span style={{ color: TELEGRAM_COLOR }}>Telegram Groups</span></h2>
            <div className="space-y-3">
              {groups.telegram.map(g => (
                <a key={g.id} href={g.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl p-4 hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <TelegramIcon className="w-8 h-8" />
                    <div>
                      <div className="font-semibold">{g.name}</div>
                      <div className="text-sm text-gray-500">Telegram group invite</div>
                    </div>
                  </div>
                  <div className="text-primary font-semibold">Open</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signals;
