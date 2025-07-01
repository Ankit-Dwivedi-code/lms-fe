import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const CourseVideosPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch course name/details
  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
        withCredentials: true,
      });
      setCourse(res.data.data);
    } catch {
      toast.error("Failed to load course");
    }
  };

  // Fetch course videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get-all-videos/${courseId}`, {
        withCredentials: true,
      });
      const courseData = res.data.data[0];
      setVideos(courseData?.videos ? [courseData.videos] : []);
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/trainer/dashboard")}
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
        <p className="text-gray-400 mt-1 text-sm">All videos for <span className="text-cyan-400">{course?.courseName} Stack Course</span></p>
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No videos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-[#181828] rounded-lg p-4 border border-cyan-500/10 shadow-sm"
            >
              <img
                src={video.thumbnail || "https://via.placeholder.com/300x180?text=Video+Thumbnail"}
                alt="video thumb"
                className="rounded w-full h-40 object-cover mb-3"
              />
              <h2 className="text-lg font-semibold text-cyan-300">{video.title || "Untitled Video"}</h2>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {video.description || "No description"}
              </p>
              <a
                href={video.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-sm text-blue-400 hover:underline"
              >
                Watch on YouTube
              </a>
              <p className="mt-2 text-xs text-gray-500">
                {video.isPublished ? "Published" : "Unpublished"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseVideosPage;
