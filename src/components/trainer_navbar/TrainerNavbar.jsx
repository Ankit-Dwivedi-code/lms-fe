import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const TrainerNavbar = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchTrainer();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://neuronest-be-production.up.railway.app/api/a2/trainer/logout', {}, { withCredentials: true });
      navigate('/auth/trainer/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-4 flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader size={30} color="#00ffff" />
      </div>
    );
  }

  return (
    <nav className="bg-[#0f0f1b] border-b border-pink-500/10 px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Left - Brand Name */}
        <div className="text-2xl font-bold text-cyan-400 text-center sm:text-left mb-3 sm:mb-0">
          NeuroNest Trainer
        </div>

        {/* Right - Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 gap-2 sm:gap-0">
          <div className="text-center sm:text-right">
            <p className="text-sm font-medium text-white truncate max-w-[140px]">{trainer?.username}</p>
            <p className="text-xs text-gray-400 truncate">{trainer?.subjectname}</p>
          </div>

          <img
            src={trainer?.avatar}
            alt="Trainer Avatar"
            className="w-10 h-10 rounded-full border-2 border-pink-400 object-cover"
          />

          <button
            onClick={handleLogout}
            className="text-pink-400 hover:text-pink-300 transition mt-2 sm:mt-0"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
