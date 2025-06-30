import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const ForgotPassword = ({ onOTPSent }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrors('');
  };

  const validateEmail = () => {
    if (!email) {
      return 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const error = validateEmail();
    if (error) {
      setErrors(error);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://neuronest-be-production.up.railway.app/api/a2/students/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('OTP sent to your email!');
        onOTPSent && onOTPSent(email); // Optional callback
        navigate('/auth/a2/verify-forgotpass', { state: { email } });
      } else {
        toast.error(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#0f0f1b] px-4">
      <ToastContainer />
      <div className="bg-[#151522] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center mb-4">Forgot Password?</h1>
        <p className="text-center text-gray-400 mb-6">
          Enter your registered email and we’ll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSendOTP} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md border ${errors ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="you@example.com"
            />
            {errors && <p className="text-sm text-red-500 mt-1 animate-shake">{errors}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300"
              disabled={loading}
            >
              {loading ? <SquareLoader color="#fff" size={20} /> : 'Send OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
