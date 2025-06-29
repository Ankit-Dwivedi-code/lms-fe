import React from 'react';

const CollaborationSection = () => {
  return (
    <section className="bg-[#0f0f1b] py-16 text-white">
      <div className="container mx-auto px-5 lg:px-20">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight leading-tight animate-pulse-slow">
          We collaborate with{' '}
          <a
            href="#collaborators"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:underline transition-all"
          >
            leading companies and institutions
          </a>
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {[
            { src: "/img/google.png", alt: "Google" },
            { src: "/img/facebook.png", alt: "Facebook" },
            { src: "/img/samsung.png", alt: "Samsung" },
            { src: "/img/ibm.png", alt: "IBM" },
            { src: "/img/amazon.png", alt: "Amazon" },
            { src: "/img/microsoft.png", alt: "Microsoft" },
          ].map((logo, index) => (
            <div
              key={index}
              className="bg-[#1a1a2e] p-4 rounded-xl shadow-neon-purple hover:shadow-neon-pink transition duration-300 ease-in-out animate-pulse-slow"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 md:h-20 max-w-[120px] w-full object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
