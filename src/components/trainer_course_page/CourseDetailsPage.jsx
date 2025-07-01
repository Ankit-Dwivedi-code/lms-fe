import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiEdit, FiTrash, FiVideo, FiUsers, FiArrowLeft, FiUpload,
} from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const thumbnailInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
        withCredentials: true,
      });
      setCourse(res.data.data);
    } catch (err) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`https://neuronest-be-production.up.railway.app/api/a2/course/delete/${courseId}`, {
        withCredentials: true,
      });
      toast.success("Course deleted");
      navigate("/trainer/dashboard");
    } catch {
      toast.error("Deletion failed");
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('thumbnail', file);

    try {
      await axios.patch(`https://neuronest-be-production.up.railway.app/api/a2/course/update-thumbnail/${courseId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success("Thumbnail updated");
      fetchCourse(); // Refresh thumbnail
    } catch {
      toast.error("Thumbnail update failed");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader color="#00ffff" />
      </div>
    );
  }

  if (!course) {
    return <div className="text-white text-center mt-10">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121221] border-r border-cyan-500/10 hidden md:flex flex-col p-4">
        <button
          onClick={() => navigate("/trainer/dashboard")}
          className="text-cyan-400 hover:text-white flex items-center gap-2 mb-6"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/trainer/edit-course/${courseId}`)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-cyan-600 bg-cyan-500 text-sm"
          >
            <FiEdit /> Edit Course
          </button>
          <button
            onClick={() => navigate(`/trainer/videos/${courseId}`)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-indigo-600 bg-indigo-500 text-sm"
          >
            <FiVideo /> Manage Videos
          </button>
          <button
            onClick={() => navigate(`/trainer/students/${courseId}`)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-purple-600 bg-purple-500 text-sm"
          >
            <FiUsers /> Enrolled Students
          </button>
          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600 bg-red-500 text-sm"
          >
            <FiTrash /> Delete Course
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="relative w-full lg:w-1/2 group">
            <img
              src={course.thumbnail}
              alt="Course Thumbnail"
              className="rounded-lg w-full h-64 object-cover border border-cyan-500/20"
            />
            <button
              onClick={() => thumbnailInputRef.current.click()}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80"
              title="Edit Thumbnail"
            >
              <FiUpload size={18} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              onChange={handleThumbnailChange}
              hidden
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-pink-400">{course.courseName}</h1>
            <p className="mt-3 text-gray-300 text-sm">{course.description}</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Level:</strong> {course.level}</p>
              <p><strong>Language:</strong> {course.language}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Status:</strong> {course.isPublished ? 'Published' : 'Unpublished'} / {course.approvalStatus}</p>
              <p><strong>Tags:</strong> {course.tags.length ? course.tags.join(', ') : 'None'}</p>
              <p><strong>Prerequisites:</strong> {course.prerequisites.length ? course.prerequisites.join(', ') : 'None'}</p>
              <p><strong>Created:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
