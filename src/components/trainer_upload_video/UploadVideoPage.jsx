import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SquareLoader } from 'react-spinners';
import axios from 'axios';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const UploadVideoPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.thumbnail || !form.video) {
      toast.error('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('thumbnail', form.thumbnail);
    data.append('video', form.video);

    try {
      setLoading(true);
      const res = await axios.post(
        `https://neuronest-be-production.up.railway.app/api/a2/videos/upload/${courseId}`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) {
        toast.success('Video uploaded!');
        setTimeout(() => navigate(`/trainer/videos/${courseId}`), 1500);
      } else {
        toast.error(res.data.message || 'Upload failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error uploading video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white flex flex-col justify-center items-center p-6">
      <ToastContainer />
      <div className="w-full max-w-xl bg-[#101020] p-8 rounded-xl shadow-md border border-pink-500/20">
        <h2 className="text-3xl text-cyan-400 font-bold text-center mb-6">Upload New Video</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm">Video Title</label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-[#181828] px-4 py-2 rounded-md border border-cyan-400/30 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="e.g., JavaScript Basics"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#181828] px-4 py-2 rounded-md border border-cyan-400/30 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Short description about the video..."
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-1 text-sm">Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-300"
            />
          </div>

          {/* Video File */}
          <div>
            <label className="block mb-1 text-sm">Video File</label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-300"
            />
          </div>

          {/* Submit + Dashboard */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 rounded-full font-semibold transition ${
                loading
                  ? 'bg-cyan-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500'
              }`}
            >
              {loading ? (
                <>
                  <SquareLoader size={18} color="#fff" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <FiUpload /> Upload Video
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/trainer/dashboard')}
              className="py-2 px-4 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition w-full sm:w-auto"
            >
              Go to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoPage;
