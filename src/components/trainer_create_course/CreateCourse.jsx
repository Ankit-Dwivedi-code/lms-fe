import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseName: '',
    description: '',
    category: '',
    level: 'Beginner',
    language: '',
    price: '',
    prerequisites: '',
    thumbnail: null,
  });
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handleChange = e => {
    const { id, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const { courseName, description, category, language, price, thumbnail } = form;
    return courseName && description && category && language && price && thumbnail;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill all required fields!');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (form.prerequisites) data.append('prerequisites', form.prerequisites.split(',').map(s => s.trim()));

    try {
      setLoading(true);
      const res = await axios.post(
        'https://neuronest-be-production.up.railway.app/api/a2/course/publish-course',
        data, { withCredentials: true }
      );
      if (res.data.success) {
        toast.success('Course created!');
        setTimeout(() => navigate('/trainer/dashboard'), 1500);
      } else {
        toast.error(res.data.message || 'Failed to create course');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 bg-[#0f0f1b] px-4 text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={`max-w-2xl w-full bg-[#101020] rounded-xl shadow-xl p-8 border border-pink-500/20 ${shake ? 'animate-shake' : ''}`} data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Create New Course</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Text Inputs */}
          {[
            { id: 'courseName', label: 'Course Name', type: 'text', placeholder: 'MERN Stack Development' },
            { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Write a brief summary...' },
            { id: 'category', label: 'Category', type: 'text', placeholder: 'For college students' },
            { id: 'language', label: 'Language', type: 'text', placeholder: 'English / Hindi' },
            { id: 'price', label: 'Price (INR)', type: 'number', placeholder: 'e.g., 4999' },
            { id: 'prerequisites', label: 'Prerequisites (comma-separated)', type: 'text', placeholder: 'HTML, CSS, JS' },
          ].map(field => field.type === 'textarea' ? (
            <div key={field.id}>
              <label className="block text-sm text-gray-300 mb-1">{field.label}</label>
              <textarea
                id={field.id}
                rows="4"
                value={form[field.id]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#181828] rounded-md border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={field.placeholder}
              />
            </div>
          ) : (
            <div key={field.id}>
              <label className="block text-sm text-gray-300 mb-1">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                value={form[field.id]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#181828] rounded-md border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Level Select */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Level</label>
            <select
              id="level"
              value={form.level}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#181828] rounded-md border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Thumbnail Image</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-white file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 hover:file:bg-pink-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 rounded-full text-white font-semibold transition ${
                loading ? 'bg-cyan-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500'
              }`}
            >
              {loading ? (
                <><SquareLoader size={18} color="#fff" /><span className="ml-2">Publishing...</span></>
              ) : 'Publish Course'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/trainer/dashboard')}
              className="py-2 px-4 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
