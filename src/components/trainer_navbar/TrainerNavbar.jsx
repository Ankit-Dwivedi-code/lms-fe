import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FiLogOut, FiChevronDown } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const TrainerNavbar = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchTrainer = async () => {
    try {
      const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/trainer/get-trainer', {
        withCredentials: true,
      });
      setTrainer(res.data.data);
    } catch (err) {
      console.error("Failed to fetch trainer data:", err);
      navigate('/auth/trainer/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://neuronest-be-production.up.railway.app/api/a2/trainer/logout', {}, { withCredentials: true });
      navigate('/auth/trainer/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="w-full py-4 flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader size={30} color="#00ffff" />
      </div>
    );
  }

  return (
    <nav className="bg-[#0f0f1b] border-b border-pink-500/10 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between flex-wrap">
        {/* Brand */}
        <div className="text-2xl font-bold text-cyan-400">NeuroNest Trainer</div>

        {/* Right Section */}
        <div className="relative mt-3 sm:mt-0" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white truncate max-w-[140px]">{trainer?.username}</p>
              <p className="text-xs text-gray-400 truncate">{trainer?.subjectname}</p>
            </div>
            <img
              src={trainer?.avatar}
              alt="Trainer Avatar"
              className="w-10 h-10 rounded-full border-2 border-pink-400 object-cover"
            />
            <FiChevronDown className="text-pink-400" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#181828] rounded-lg border border-cyan-400/20 shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/trainer/profile');
                }}
                className="w-full text-left px-4 py-2 hover:bg-cyan-500/10 text-white text-sm"
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-pink-400 hover:bg-pink-500/10 text-sm"
              >
                <div className="flex items-center gap-2">
                  <FiLogOut /> Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
