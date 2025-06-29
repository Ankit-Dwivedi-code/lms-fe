import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Login.css'; // Shake effect

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8000/api/a2/students/login',
        formData,
        { withCredentials: true }
      );

      if (res.data.success && res.data.message.includes('OTP sent')) {
        toast.info('Please verify your login with OTP!');
        navigate('/auth/a2/verifylogin', { state: { email: formData.email } });
      } else {
        toast.success('Login successful!');
        navigate('/dashboard'); // or wherever user should go
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white">
      <ToastContainer />
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg border border-pink-500/20 bg-[#101020] ${shake ? 'shake' : ''}`}
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-400">
          Sign In to NeuroNest
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md bg-[#181828] border ${errors.email ? 'border-red-500' : 'border-cyan-400/30'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-md bg-[#181828] border ${errors.password ? 'border-red-500' : 'border-cyan-400/30'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <Link to="/auth/a2/forgotpassword" className="text-cyan-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white py-2 rounded-md font-bold hover:from-pink-600 hover:to-purple-500 transition duration-300"
          >
            {loading ? <SquareLoader color="#fff" size={20} /> : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          New here?{' '}
          <Link to="/signup/student" className="text-pink-400 hover:underline font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
