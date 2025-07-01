import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const TrainerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/course/my-courses', {
        withCredentials: true,
      });
      setCourses(res.data.data || []);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`https://neuronest-be-production.up.railway.app/api/a2/course/delete/${id}`, {
        withCredentials: true,
      });
      toast.success('Course deleted');
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch {
      toast.error('Deletion failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f0f1b]">
        <SquareLoader color="#00ffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-4">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-cyan-400">Your Courses</h1>
        <button
          onClick={() => navigate('/create/course')}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 px-4 py-2 rounded-full text-white text-sm font-semibold"
        >
          <FiPlus size={18} /> Create New Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg mb-4">You haven’t created any courses yet.</p>
          <button
            onClick={() => navigate('/create/course')}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 text-white rounded-full font-medium"
          >
            Start Creating
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/trainer/course/${course._id}`)}
              className="bg-[#181828] border border-cyan-500/20 rounded-lg p-4 shadow-md flex flex-col cursor-pointer hover:border-cyan-400 transition"
            >
              <img
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold text-pink-400">{course.courseName}</h2>
              <p className="text-sm text-gray-400">{course.category} • {course.level}</p>
              <p className="text-xs text-gray-500 mt-1">Created: {new Date(course.createdAt).toLocaleDateString()}</p>
              <p className="text-sm mt-2">₹ {course.price} • {course.language}</p>
              <p className="text-sm mt-1">
                Status: <span className={`${course.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                  {course.isPublished ? 'Published' : 'Unpublished'}
                </span> / {course.approvalStatus}
              </p>

              {/* Action Buttons (Edit + Delete only) */}
              <div
                className="mt-4 flex gap-3"
                onClick={(e) => e.stopPropagation()} // prevent parent click
              >
                <button
                  onClick={() => navigate(`/trainer/edit-course/${course._id}`)}
                  className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white flex items-center gap-1"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white flex items-center gap-1"
                >
                  <FiTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
