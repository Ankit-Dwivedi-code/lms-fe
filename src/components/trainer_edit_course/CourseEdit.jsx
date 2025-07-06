import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const CourseEdit = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({
    courseName: '',
    description: '',
    price: '',
    tags: ''
  });

  // Fetch course details
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
          withCredentials: true
        });
        const course = res.data.data;
        setCourseData({
          courseName: course.courseName || '',
          description: course.description || '',
          price: course.price || '',
          tags: course.tags?.join(', ') || ''
        });
      } catch (err) {
        toast.error("❌ Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://neuronest-be-production.up.railway.app/api/a2/course/edit/${courseId}`, {
        ...courseData,
        tags: courseData.tags.split(',').map(tag => tag.trim())
      }, { withCredentials: true });

      toast.success("✅ Course updated successfully!");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      toast.error("❌ Update failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader color="#00ffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white p-8">
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      <h1 className="text-3xl font-bold text-center text-cyan-400 mb-10">
        🛠️ Edit Course Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#1f1f2e] p-6 rounded-xl border border-cyan-500/20 shadow-xl space-y-6"
      >
        <div>
          <label className="block mb-2 text-sm font-semibold text-pink-400">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#0f0f1b] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-pink-400">Description</label>
          <textarea
            name="description"
            rows={4}
            value={courseData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#0f0f1b] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-pink-400">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#0f0f1b] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-pink-400">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={courseData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0f0f1b] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-cyan-500 hover:to-pink-500 text-white rounded-full transition-all duration-300 shadow-md"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
};

export default CourseEdit;
