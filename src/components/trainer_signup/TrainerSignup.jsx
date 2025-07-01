import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './TrainerSignup.css'; // Must include `.shake` animation

const TrainerSignup = () => {
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    uniqueCode: '',
    subjectname: '',
    avatar: null,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateForm = () => {
    const { username, email, password, uniqueCode, subjectname, avatar } = formData;
    return username && email && password && uniqueCode && subjectname && avatar;
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      setLoading(true);
      const res = await axios.post('https://neuronest-be-production.up.railway.app/api/a2/trainer/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('OTP sent to your email!');
        navigate('/auth/trainer/verify', { state: { email: formData.email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white px-4">
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover hideProgressBar />
      <div
        className={`w-full max-w-xl p-8 bg-[#101020] rounded-xl shadow-xl border border-pink-500/20 ${shake ? 'shake' : ''}`}
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">Trainer Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: 'username', label: 'Name', type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { id: 'uniqueCode', label: 'Invite Code', type: 'text', placeholder: 'ABC123XYZ' },
            { id: 'subjectname', label: 'Subject', type: 'text', placeholder: 'e.g., React, DSA' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-gray-300 mb-1">{label}</label>
              <input
                id={id}
                type={type}
                value={formData[id] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 bg-[#181828] border border-cyan-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          ))}

          {/* Password field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 bg-[#181828] border border-cyan-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Avatar Upload */}
          <div>
            <label htmlFor="avatar" className="block text-sm text-gray-300 mb-1">Upload Avatar</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-full transition duration-300 ${
              loading
                ? 'bg-cyan-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <SquareLoader color="#fff" size={16} />
                <span className="ml-2">Submitting...</span>
              </div>
            ) : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/auth/trainer/login')}
          className="text-pink-400 hover:underline cursor-pointer"
        >
          Login here
        </span>
        </div>
      </div>
      
    </div>
  );
};

export default TrainerSignup;
