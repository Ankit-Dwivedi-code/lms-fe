import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/course/all', {
        withCredentials: true,
      });
      setCourses(res.data.data);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (courseId) => {
    try {
      await axios.put(`https://neuronest-be-production.up.railway.app/api/a2/admin/publish-course/${courseId}`, {}, {
        withCredentials: true,
      });
      toast.success('Course published');
      fetchCourses();
    } catch {
      toast.error('Failed to publish course');
    }
  };

 const generateInviteCode = async () => {
  setGenerating(true);
  try {
    const res = await axios.get(
      'https://neuronest-be-production.up.railway.app/api/a2/admin/generate-invite-code',
      { withCredentials: true } // ✅ Move config here as 2nd param
    );
    setInviteCode(res.data.data.inviteCode); // ✅ Access the nested field correctly
    toast.success('Invite code generated!');
  } catch {
    toast.error('Failed to generate invite code');
  } finally {
    setGenerating(false);
  }
};

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Admin Dashboard</h1>

      {/* Invite Code Generator */}
      <div className="mb-8">
        <button
          onClick={generateInviteCode}
          disabled={generating}
          className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 px-6 py-2 rounded-full font-semibold"
        >
          {generating ? 'Generating...' : 'Generate Trainer Invite Code'}
        </button>
        {inviteCode && (
          <p className="mt-3 text-green-400 break-all">
            New Invite Code: <span className="font-mono">{inviteCode}</span>
          </p>
        )}
      </div>

      {/* Courses */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <SquareLoader color="#00ffff" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <p className="text-gray-400">No courses available.</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-[#181828] border border-cyan-500/20 rounded-lg p-4 shadow-lg"
              >
                <img
                  src={course.thumbnail}
                  alt="course"
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h2 className="text-xl font-bold text-pink-400 mb-1">{course.courseName}</h2>
                <p className="text-sm text-gray-400 mb-2">{course.description}</p>
                <p className="text-xs text-cyan-300 mb-1">Level: {course.level}</p>
                <p className="text-xs text-yellow-300 mb-1">Language: {course.language}</p>
                <p className="text-xs text-gray-300 mb-1">
                  Status:{' '}
                  {course.isPublished ? (
                    <span className="text-green-400">Published ✅</span>
                  ) : (
                    <span className="text-red-400">Unpublished ❌</span>
                  )}
                </p>
                <p className="text-xs text-gray-300 mb-3">
                  Approval: {course.approvalStatus}
                </p>
                {!course.isPublished && (
                  <button
                    onClick={() => handlePublish(course._id)}
                    className="mt-2 w-full py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600"
                  >
                    Publish Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
