import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiUpload, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseVideosPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState(null); // Single video object now
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', thumbnail: null });

  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
        withCredentials: true,
      });
      setCourse(res.data.data);
    } catch {
      toast.error('Failed to load course');
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get-all-videos/${courseId}`, {
        withCredentials: true,
      });
      const courseData = res.data.data[0];
      setVideo(courseData?.videos || null);
    } catch {
      toast.error('Failed to fetch video');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!video?._id) return;
    try {
      await axios.delete(`https://neuronest-be-production.up.railway.app/api/a2/videos/delete/${video._id}`, {
        withCredentials: true,
      });
      toast.success('Video deleted');
      setVideo(null);
    } catch {
      toast.error('Error deleting video');
    }
  };

  const openEditModal = () => {
    setEditingVideo(video);
    setForm({
      title: video.title,
      description: video.description,
      thumbnail: null
    });
  };

  const closeEditModal = () => {
    setEditingVideo(null);
    setForm({ title: '', description: '', thumbnail: null });
  };

  const handleFormChange = (e) => {
    const { id, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleUpdateSubmit = async () => {
    if (!editingVideo?._id) return;

    const data = new FormData();
    if (form.title) data.append('title', form.title);
    if (form.description) data.append('description', form.description);
    if (form.thumbnail) data.append('thumbnail', form.thumbnail);

    try {
      await axios.put(`https://neuronest-be-production.up.railway.app/api/a2/videos/update/${editingVideo._id}`, data, {
        withCredentials: true,
      });
      toast.success('Video updated!');
      closeEditModal();
      fetchVideos();
    } catch {
      toast.error('Failed to update video');
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchVideos();
  }, [courseId]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader color="#00ffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-6">
      <ToastContainer />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/trainer/dashboard')}
          className="text-cyan-400 hover:text-white flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <button
          onClick={() => navigate(`/trainer/upload-video/${courseId}`)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold"
        >
          <FiUpload /> Upload New Video
        </button>
      </div>

      {/* Course Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pink-400">{course?.courseName}</h1>
        <p className="text-gray-400 mt-1 text-sm">
          All videos for <span className="text-cyan-400">{course?.courseName}</span>
        </p>
      </div>

      {/* Video Card */}
      {!video ? (
        <div className="text-center text-gray-500 mt-20 text-lg">No video uploaded yet.</div>
      ) : (
        <div className="bg-[#181828] rounded-lg p-4 border border-cyan-500/10 shadow-md relative max-w-lg mx-auto">
          <video controls src={video.video} className="w-full rounded mb-3" />
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h2 className="text-lg font-semibold text-cyan-300">{video.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{video.description}</p>
          <p className="mt-2 text-xs text-gray-500">
            Status: {video.isPublished ? 'Published ✅' : 'Unpublished ❌'}
          </p>
          <div className="absolute top-3 right-3 flex gap-3">
            <FiEdit2
              onClick={openEditModal}
              className="cursor-pointer text-yellow-400 hover:text-yellow-300"
            />
            <FiTrash2
              onClick={handleDelete}
              className="cursor-pointer text-red-500 hover:text-red-400"
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-[#101020] p-6 rounded-xl max-w-md w-full text-white relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={closeEditModal}
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Edit Video</h2>
            <div className="space-y-4">
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="Video Title"
                className="w-full p-2 rounded-md bg-[#181828] border border-cyan-400/30 outline-none"
              />
              <textarea
                id="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Description"
                rows={3}
                className="w-full p-2 rounded-md bg-[#181828] border border-cyan-400/30 outline-none"
              />
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFormChange}
                className="text-sm text-gray-300"
              />
              <button
                onClick={handleUpdateSubmit}
                className="w-full py-2 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 font-semibold"
              >
                Update Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideosPage;
