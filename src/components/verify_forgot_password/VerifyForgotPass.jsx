import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const VerifyForgotPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('Invalid access. Email is required.');
      navigate('/auth/a2/forgotpassword');
    }
  }, [email, navigate]);

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    setErrors('');
  };

  const validateOtp = () => {
    if (!otp) return 'Please enter the OTP';
    if (!/^\d{6}$/.test(otp)) return 'OTP must be a 6-digit number';
    return '';
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const error = validateOtp();
    if (error) {
      setErrors(error);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://neuronest-be-production.up.railway.app/api/a2/students/verify-resetpassotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('OTP verified successfully! Proceed to reset your password.');
        navigate('/auth/a2/reset-pass', { state: { email } });
      } else {
        toast.error(data.message || 'Invalid OTP. Please try again.');
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
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center mb-4">Verify OTP</h1>
        <p className="text-center text-gray-400 mb-6">
          Enter the OTP sent to <span className="text-pink-400 font-medium">{email}</span> to reset your password.
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md border ${errors ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors && <p className="text-sm text-red-500 mt-1 animate-shake">{errors}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300"
            >
              {loading ? <SquareLoader color="#fff" size={20} /> : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyForgotPass;
