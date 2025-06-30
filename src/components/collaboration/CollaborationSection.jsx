import React from 'react';

const companies = [
  { src: '/img/google.png', alt: 'Google' },
  { src: '/img/facebook.png', alt: 'Facebook' },
  { src: '/img/samsung.png', alt: 'Samsung' },
  { src: '/img/ibm.png', alt: 'IBM' },
  { src: '/img/amazon.png', alt: 'Amazon' },
  { src: '/img/microsoft.png', alt: 'Microsoft' },
];

const CollaborationSection = () => {
  return (
    <section className="bg-[#0f0f1b] py-16 text-white">
      <div className="container mx-auto px-5 lg:px-20 text-center">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight animate-pulse-slow">
          We collaborate with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
            leading companies and institutions
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg md:text-xl">
          Learn through <span className="text-pink-400 font-semibold">NeuroNest</span> and get the opportunity to be placed in these top companies that shape the future of technology.
        </p>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((logo, index) => (
            <div
              key={index}
              className="bg-[#1a1a2e] p-4 rounded-xl shadow-neon-purple hover:shadow-neon-pink transition duration-300 ease-in-out animate-glow"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 md:h-20 max-w-[120px] w-full object-contain grayscale transition duration-500 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
