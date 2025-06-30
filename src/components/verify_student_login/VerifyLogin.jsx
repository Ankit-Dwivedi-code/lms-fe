import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import axios from 'axios';
import Cookies from 'js-cookie';
import './VerifyLogin.css';

const VerifyLogin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      toast.error('No email provided for verification');
      navigate('/auth/a2/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://neuronest-be-production.up.railway.app/api/a2/students/verify-login', {
        email,
        otp,
      });

      Cookies.set('accessToken', response.data.data.accessToken, { expires: 1 });
      Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 15 });

      toast.success('Login verified successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setOtp('');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('http://localhost:8000/api/a2/students/resend-otp', { email });
      toast.success('OTP resent successfully');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#0f0f1b] flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="bg-[#151522] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center mb-6">🔐 Verify Your Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Display */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* OTP Input */}
          <div>
            <label htmlFor="otp" className="block text-sm mb-1 text-gray-300">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError('');
              }}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className={`w-full px-4 py-2 rounded-md bg-gray-800 text-white border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              required
            />
            {error && <p className="text-sm text-red-500 mt-1 animate-shake">{error}</p>}
          </div>

          {/* Verify Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold py-2 rounded-full hover:opacity-90 transition-all duration-300"
            >
              {loading ? <SquareLoader color="#fff" size={20} /> : 'Verify OTP'}
            </button>
          </div>
        </form>

        {/* Resend Link */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Didn't receive the OTP?{' '}
          <button
            onClick={handleResendOtp}
            type="button"
            className="text-cyan-400 font-medium hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyLogin;
