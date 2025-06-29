import React from 'react';
import './JoinNow.css'; // Custom styles
import { Link } from 'react-router-dom';

const JoinNow = () => {
  return (
    <section className="bg-[#0f0f1b] py-16 px-5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 lg:px-20">
        
        {/* Image Section */}
        <div className="flex-1">
          <img 
            src="/img/hero5.png"
            alt="Join NeuroNest"
            className="w-full h-auto rounded-2xl shadow-[0_0_20px_rgba(199,21,133,0.4)]"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Step Into the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">NeuroNest</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Elevate your career with cutting-edge skills in AI, Web, Data, and DevOps. Join the league of innovators shaping tomorrow.
          </p>
          <Link
            to="/auth/a2/signup"
            className="inline-block px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:opacity-90 transition duration-300"
          >
            Join for Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
