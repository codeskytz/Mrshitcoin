import React from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Mr Shitcoin</h3>
            <p className="text-gray-400">
              Your trusted guide in meme coin trading.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'about', 'products'].map((item) => (
                <li key={item}>
                  <Link
                    to={item}
                    smooth={true}
                    duration={500}
                    className="text-gray-400 hover:text-primary cursor-pointer capitalize"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Trading Books</li>
              <li>Video Courses</li>
              <li>Signal Groups</li>
              <li>Trading Bots</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-gray-400">
              support@mrshitcoin.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mr Shitcoin. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;