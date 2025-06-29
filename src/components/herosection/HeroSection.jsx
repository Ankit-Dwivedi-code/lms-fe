import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeroSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkStudent = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/a2/students/get-student', {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        setUser(null); // Not logged in
      }
    };

    checkStudent();
  }, []);

  return (
    <section className="bg-[#0f0f1b] py-12 lg:py-16 text-white">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-5 lg:px-20">
        
        {/* Left Section: Text */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 lg:mb-6 leading-tight">
            Explore the Future of Tech
          </h1>
          
          {/* Typewriter Animation */}
          <div className="text-base sm:text-lg mb-6 lg:mb-8">
            <span className="font-bold text-xl text-cyan-400">Learn </span>
            <span className="inline font-bold text-xl text-pink-500">
              <Typewriter
                words={['AI & ML', 'Web Development', 'Cloud Computing', 'Cybersecurity', 'Data Engineering']}
                loop={0}
                cursor
                cursorStyle='|' 
                typeSpeed={100} 
                deleteSpeed={80} 
                delaySpeed={1500} 
              />
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-300 mb-6 lg:mb-8">
            Master in-demand skills through immersive learning experiences. Upskill for tomorrow, today.
          </p>

          {/* Conditional button */}
          {!user ? (
            <Link to="/auth/a2/signup">
              <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 text-white py-3 px-8 rounded-full text-lg shadow-lg">
                Join the Revolution
              </button>
            </Link>
          ) : (
            <p className="text-cyan-300 font-semibold text-lg animate-pulse">
              🚀 Welcome back, {user.username || 'Student'}!
            </p>
          )}
        </div>

        {/* Right Section: Image */}
        <div className="relative lg:w-auto lg:mt-0 mt-8">
          <img
            src="/img/hero4.png"
            alt="Futuristic robot coding"
            className="relative w-48 h-auto sm:w-60 lg:w-80 drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
