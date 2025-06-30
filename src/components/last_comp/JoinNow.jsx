import React, { useEffect, useState } from 'react';
import './JoinNow.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JoinNow = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/students/get-student', {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (err) {
        setUser(null);
      }
    };

    fetchStudent();
  }, []);

  return (
    <section className="bg-[#0f0f1b] py-16 px-5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 lg:px-20">
        
        {/* Image Section */}
        <div className="flex-1 relative">
          <img 
            src="/img/hero5.png"
            alt="Join NeuroNest"
            className="w-full h-auto rounded-2xl shadow-[0_0_20px_rgba(199,21,133,0.4)]"
          />
          {/* {user && (
            <p className="absolute bottom-3 right-1 text-sm sm:text-base text-cyan-300 font-semibold bg-[#101020]/60 px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
              🌟 Keep exploring, {user.username || 'Student'}!
            </p>
          )} */}
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Step Into the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">NeuroNest</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Elevate your career with cutting-edge skills in AI, Web, Data, and DevOps. Join the league of innovators shaping tomorrow.
          </p>

          {!user && (
            <Link
              to="/auth/a2/signup"
              className="inline-block px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:opacity-90 transition duration-300"
            >
              Join for Free
            </Link>
          )}
          {user && (
            <p className="absolute text-sm sm:text-base text-cyan-300 font-semibold bg-[#101020]/60 px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
              🌟 Keep exploring, {user.username || 'Student'}!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
