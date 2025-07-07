import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const AdminLoginVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !email) {
      toast.error('Missing OTP or Email!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://neuronest-be-production.up.railway.app/api/a2/admin/verify-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      if (!res.ok) throw new Error('OTP verification failed');

      toast.success('Admin verified successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] to-[#1f1f2e] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-[#181828]/80 backdrop-blur-md border border-cyan-400/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Verify Admin OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full bg-[#0f0f1b] border border-cyan-400/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 rounded-full font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <SquareLoader size={20} color="#fff" /> : 'Verify & Proceed'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginVerify;
