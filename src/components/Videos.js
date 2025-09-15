import React from 'react';
import Navbar from './Navbar';

const videos = [
  {
    id: 'dtrg4F4pRkc',
    title: 'Tengeneza 800 Dollar kwa mtaji wa dola 1 tu',
    description: 'kuza mtaji wako kwa haraka kupitia shitcoin trading',
  },
  {
    id: 'GidIF32j25A?si',
    title: 'Namna sahihi ya kuwekeza kwenye Shitcoin bila Hasara',
    description: 'fahamu mbinu zilizonifanya kuwa millionare.',
  },
  {
    id: '1eCkNT1pORM',
    title: 'Jinsi ya ku trade Shitcoin',
    description: 'Kila kitu unachohitaji kujua kuhusu shitcoin trading.',
  },
];

const Videos = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-dark-900 dark:to-dark-950 py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Video Courses</h1>
      <p className="text-center mb-8 text-gray-700 dark:text-gray-300">Watch lessons directly on-site. We embed YouTube videos for convenient playback.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map(video => (
          <div key={video.id} className="bg-white dark:bg-dark-900 shadow rounded-xl overflow-hidden">
            <div className="relative pb-[56.25%]">{/* 16:9 ratio */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-primary mb-2">{video.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
);

export default Videos;

