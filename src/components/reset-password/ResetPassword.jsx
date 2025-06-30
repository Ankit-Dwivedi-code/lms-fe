import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SquareLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('Invalid access. Email is required.');
      navigate('/auth/a2/forgotpassword');
    }
  }, [email, navigate]);

  const validateForm = () => {
    if (!newPassword || !confirmPassword) return 'Please fill in both password fields';
    if (newPassword.length < 6) return 'Password must be at least 6 characters';
    if (newPassword !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrors(error);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://neuronest-be-production.up.railway.app/api/a2/students/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('Password reset successfully! Please login.');
        navigate('/auth/a2/login');
      } else {
        toast.error(data.message || 'Failed to reset password.');
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
        <h1 className="text-3xl font-extrabold text-cyan-400 text-center mb-4">Reset Password</h1>
        <p className="text-center text-gray-400 mb-6">
          Enter your new password to reset your account.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label htmlFor="newPassword" className="block text-sm text-gray-300 mb-1">
              New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors('');
              }}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md border ${
                errors ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter new password"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors('');
              }}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md border ${
                errors ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Re-enter new password"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-400"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Error */}
          {errors && <p className="text-sm text-red-500 animate-shake">{errors}</p>}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300"
            >
              {loading ? <SquareLoader color="#fff" size={20} /> : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
