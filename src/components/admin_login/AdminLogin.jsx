import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://neuronest-be-production.up.railway.app/api/a2/admin/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      toast.success('Login successful! Redirecting to OTP verification...');
      navigate('/admin-login-verify', { state: { email } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] to-[#1f1f2e] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-[#181828]/80 backdrop-blur-md border border-cyan-400/20 shadow-lg rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-cyan-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@example.com"
              className="w-full bg-[#0f0f1b] border border-cyan-400/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-cyan-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full bg-[#0f0f1b] border border-cyan-400/30 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 rounded-full font-semibold flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <SquareLoader size={20} color="#fff" /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
