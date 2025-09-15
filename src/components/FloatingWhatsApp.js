import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_COLOR = '#25D366';

const FloatingWhatsApp = ({ phone = '+1234567890', message = 'Hello!' }) => {
  const href = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        left: 20,
        bottom: 20,
        zIndex: 60,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: 56,
          height: 56,
          background: WHATSAPP_COLOR,
          boxShadow: `0 8px 24px ${WHATSAPP_COLOR}33`,
          color: 'white',
        }}
      >
        <FaWhatsapp style={{ width: 24, height: 24 }} />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
