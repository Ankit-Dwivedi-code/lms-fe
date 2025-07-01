import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TrainerLoginVerify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const email = state?.email;

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate('/auth/trainer/login');
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://neuronest-be-production.up.railway.app/api/a2/trainer/verify-login',
        { email, otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success('Login Verified!');
        setTimeout(() => navigate('/trainer/dashboard'), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const res = await axios.post(
        'https://neuronest-be-production.up.railway.app/api/a2/trainer/resend-otp',
        { email },
        { withCredentials: true }
      );
      if (res.data.success) toast.success('OTP resent to your email');
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] px-4 text-white">
      <ToastContainer />
      <div className="max-w-md w-full bg-[#101020] rounded-lg shadow-xl p-8 border border-pink-500/20" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Verify Login</h2>
        <p className="text-center text-gray-400 mb-4">
          Enter the OTP sent to <span className="text-pink-400 font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#181828] border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter OTP"
              maxLength={6}
              required
            />
          </div>

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
                <span className="ml-2">Verifying...</span>
              </div>
            ) : (
              'Verify'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Didn't get the OTP?{' '}
          <span
            onClick={handleResend}
            className={`text-pink-400 underline cursor-pointer ${resending && 'opacity-60'}`}
          >
            {resending ? 'Sending...' : 'Resend'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TrainerLoginVerify;
