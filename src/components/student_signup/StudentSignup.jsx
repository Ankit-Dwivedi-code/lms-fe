import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    highestQualification: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number format';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.highestQualification) newErrors.highestQualification = 'Qualification is required';
    if (!formData.avatar) newErrors.avatar = 'Avatar is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const data = new FormData();
        Object.keys(formData).forEach(key => {
          data.append(key, formData[key]);
        });

        const response = await axios.post('http://localhost:8000/api/a2/students/register', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.success('Account created successfully!');
        navigate('/auth/a2/verify-signup', { state: { email: formData.email } });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
    setErrors({ ...errors, [id]: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white">
      <div className="flex flex-col lg:flex-row w-full lg:w-10/12 xl:w-8/12 rounded-xl overflow-hidden shadow-lg border border-pink-500/10" data-aos="fade-up">
        <div className="hidden lg:flex lg:w-1/2 bg-[#181828] p-8 flex-col justify-center">
          <h1 className="text-3xl font-bold text-cyan-400 mb-8">NeuroNest</h1>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">🚀</span>
              <span className="text-gray-300">Get started quickly with futuristic tools</span>
            </li>
            <li className="text-sm text-gray-400 ml-6">Low-code, AI, and developer-friendly APIs.</li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">🛠️</span>
              <span className="text-gray-300">Supports all tech stacks</span>
            </li>
            <li className="text-sm text-gray-400 ml-6">MERN, Machine Learning, SaaS, and more.</li>
          </ul>
        </div>

        <div className="w-full lg:w-1/2 bg-[#101020] p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Create your account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Fields */}
              {[
                { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                { id: 'username', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'phone', label: 'Phone', type: 'text', placeholder: '+1234567890' },
                { id: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { id: 'highestQualification', label: 'Highest Qualification', type: 'text', placeholder: 'e.g., BSc IT' },
                { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-300">{label}</label>
                  <input
                    id={id}
                    type={type}
                    value={formData[id] || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#181828] border border-cyan-400/20 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                    placeholder={placeholder}
                  />
                  {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id]}</p>}
                </div>
              ))}

              {/* Avatar */}
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium mb-1 text-gray-300">Avatar</label>
                <input
                  id="avatar"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full px-3 py-2 bg-[#181828] border border-cyan-400/20 rounded-md shadow-sm"
                />
                {errors.avatar && <p className="text-sm text-red-500 mt-1">{errors.avatar}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold py-2 px-4 rounded-md hover:from-pink-600 hover:to-purple-500 transition duration-300"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <SquareLoader color="#fff" size={16} />
                    <span className="ml-2">Submitting...</span>
                  </div>
                ) : 'Sign up'}
              </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />

            <p className="text-sm text-gray-400 mt-4">
              Already have an account?{' '}
              <Link to="/auth/a2/login" className="text-pink-400 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
