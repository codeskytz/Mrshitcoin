import React from 'react';
import Navbar from './Navbar';

const books = [
  {
    id: 1,
    title: 'Meme Coin Mastery',
    description: 'A deep dive into meme coin trading strategies and market psychology.',
    about: 'Written by the admin, this book covers everything from basics to advanced techniques for meme coin trading.',
    price: '$19.99',
    previewUrl: '#',
  },
  {
    id: 2,
    title: 'Crypto Signals Decoded',
    description: 'Learn how to interpret and act on crypto trading signals.',
    about: 'This book provides actionable insights and real-world examples for signal-based trading.',
    price: '$14.99',
    previewUrl: '#',
  },
];

const Books = () => (
  <>
    <Navbar />
    <section className="py-20 px-4 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-black dark:text-black mb-8 text-center">Books & Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map(book => (
            <div key={book.id} className="bg-white dark:bg-dark-800 shadow-lg rounded-xl p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-primary">{book.title}</h3>
              <p className="mb-2 text-black dark:text-gray-200">{book.description}</p>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400"><strong>About:</strong> {book.about}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-semibold text-primary">{book.price}</span>
                <div className="flex gap-2">
                  <button className="btn btn-outline" onClick={() => window.open(book.previewUrl, '_blank')}>Preview</button>
                  <button className="btn btn-primary">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Books;
