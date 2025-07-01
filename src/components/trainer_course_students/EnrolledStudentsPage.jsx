import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiUsers } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';

const EnrolledStudentsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get course name/details
  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
        withCredentials: true,
      });
      setCourse(res.data.data);
    } catch {
      toast.error("Failed to load course info");
    }
  };

  // Get enrolled students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/get-enrolled-students/${courseId}`, {
        withCredentials: true,
      });
      const courseData = res.data.data[0];
      setStudents(courseData?.students ? [courseData.students] : []);
    } catch {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchStudents();
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
        <h1 className="text-2xl font-bold text-pink-400 flex items-center gap-2">
          <FiUsers /> Enrolled Students
        </h1>
      </div>

      {/* Course Title */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-cyan-400">
          Course: {course?.courseName}
        </p>
        <p className="text-sm text-gray-400">
          Total Enrolled: {students.length}
        </p>
      </div>

      {/* Student List */}
      {students.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No students enrolled in this course.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {students.map((student, index) => (
            <div
              key={index}
              className="bg-[#181828] rounded-lg p-4 border border-cyan-500/10 shadow-md"
            >
              <p className="text-lg font-medium text-cyan-300">{student.name}</p>
              <p className="text-sm text-gray-400">{student.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledStudentsPage;
