import React, { useState } from 'react';
import Navbar from './Navbar';

const books = [
  {
    id: 1,
    title: 'Investing Mastery Bible',
    description: 'A deep dive into meme coin trading strategies and market psychology.',
    about: 'Written by the admin, this book covers everything from basics to advanced techniques for meme coin trading.',
    price: '$19.99',
    coverImage: 'https://i5.walmartimages.com/seo/Crypto-Investing-Mastery-Bible-7-BOOKS-IN-1-Cryptocurrency-Bitcoin-Ethereum-DeFi-NFTs-NFT-Art-and-Collectibles-Metaverse-Paperback-9781088052204_8384f9f9-ba4c-4532-940c-1d6404bf76b4.68b516ac34ab61afd38f9c0e49a27b98.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    previewText: 'This book introduces core meme coin strategies, risk management techniques, and real-world examples to sharpen your trading edge.',
  },
  {
    id: 2,
    title: 'Crypto Signals Decoded',
    description: 'Learn how to interpret and act on crypto trading signals.',
    about: 'This book provides actionable insights and real-world examples for signal-based trading.',
    price: '$14.99',
    coverImage: 'https://m.media-amazon.com/images/I/612xNNpMmVL._SY425_.jpg',
    previewText: 'A practical guide to understanding signal sources, evaluating signal quality, and converting signals into profitable trades.',
  },
];

const Books = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState({ title: '', text: '' });

  const openPreview = (book) => {
    setCurrentPreview({ title: book.title, text: book.previewText });
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setCurrentPreview({ title: '', text: '' });
  };

  return (
    <>
      <Navbar />
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-black dark:text-black mb-8 text-center">Books & Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map(book => (
              <div key={book.id} className="bg-white dark:bg-dark-800 shadow-lg rounded-xl p-6 flex flex-col">
                <img src={book.coverImage} alt={`${book.title} cover`} className="rounded-md mb-4 w-full h-48 object-cover mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
                <h3 className="text-2xl font-bold mb-2 text-primary">{book.title}</h3>
                <p className="mb-2 text-black dark:text-gray-200">{book.description}</p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400"><strong>About:</strong> {book.about}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-semibold text-primary">{book.price}</span>
                  <div className="flex gap-2">
                    <button className="btn btn-outline" onClick={() => openPreview(book)}>Preview</button>
                    <button className="btn btn-primary">Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/60 p-4">
          <div className="bg-white dark:bg-dark-900 rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button className="absolute top-3 right-3 text-gray-600 dark:text-gray-300" onClick={closePreview}>✕</button>
            <h3 className="text-2xl font-bold mb-2">{currentPreview.title} — Preview</h3>
            <p className="text-gray-800 dark:text-gray-200">{currentPreview.text}</p>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-outline mr-2" onClick={closePreview}>Close</button>
              <button className="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
