import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import axios from 'axios';
import './VerifyLogin.css';
import Cookies from 'js-cookie';

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
      const response = await axios.post('http://localhost:8000/api/a2/students/verify-login', {
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
      const res = await axios.post('http://localhost:8000/api/a2/students/resend-login-otp', { email });
      toast.success('OTP resent successfully');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <ToastContainer />
      <div className="z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Verify Your Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          {/* OTP Input */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
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
              className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300"
            >
              {loading ? <SquareLoader color="#fff" size={20} /> : 'Verify OTP'}
            </button>
          </div>
        </form>

        {/* Resend Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the OTP?{' '}
            <button
              onClick={handleResendOtp}
              type="button"
              className="text-indigo-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyLogin;
