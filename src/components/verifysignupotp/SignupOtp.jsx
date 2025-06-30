import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SquareLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const email = state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('No email found. Redirecting...');
      navigate('/auth/a2/signup');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://neuronest-be-production.up.railway.app/api/a2/students/verify-otp', {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success('Verification successful! Redirecting to login...');
        setTimeout(() => navigate('/auth/a2/login'), 1500);
      } else {
        toast.error(response.data.message || 'Verification failed.');
        setError(response.data.message || 'Verification failed.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to verify OTP. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setOtp('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#0f0f1b] px-4">
      <ToastContainer />
      <div className="bg-[#151522] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-cyan-400 text-center mb-2">Verify Your Email</h2>
        <p className="text-center text-gray-400 mb-6">Enter the OTP sent to <strong>{email}</strong>.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 bg-gray-800 text-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className={`w-full px-4 py-2 bg-gray-800 text-white border ${
                error ? 'border-red-500' : 'border-gray-600'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter 6-digit OTP"
            />
            {error && <p className="text-sm text-red-500 mt-1 animate-shake">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <SquareLoader color="#fff" size={16} />
                Verifying...
              </div>
            ) : (
              'Verify'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupOtp;
