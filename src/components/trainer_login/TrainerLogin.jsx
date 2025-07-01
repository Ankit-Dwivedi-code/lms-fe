import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';

const TrainerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        'https://neuronest-be-production.up.railway.app/api/a2/trainer/login',
        { email, password },
        { withCredentials: true }
      );

      // ✅ Always redirect to login verify regardless of isVerified
      toast.success('Login successful. Verifying...');
      setTimeout(() => {
        navigate('/auth/trainer/login/verify', { state: { email } });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] px-4 text-white">
      <ToastContainer />
      <div className="max-w-md w-full bg-[#101020] rounded-lg shadow-xl p-8 border border-pink-500/20" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Trainer Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#181828] border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 rounded-md bg-[#181828] border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
            <span
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-semibold transition duration-300 ${
              loading
                ? 'bg-cyan-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 text-white'
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <SquareLoader size={18} color="#fff" />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don’t have an account?{' '}
          <span
            className="text-pink-400 hover:underline cursor-pointer"
            onClick={() => navigate('/signup/trainer')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default TrainerLogin;
