import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch("https://neuronest-be-production.up.railway.app/api/a2/students/get-enrolled-courses", {
          credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            
        });

        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        } else {
          toast.error("Failed to fetch enrolled courses");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1b] text-white">
        <p className="text-xl animate-pulse">Loading your enrolled courses...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f0f1b] text-white px-5 py-16">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <div className="text-center mb-12">
        <h2 className="text-base font-semibold tracking-wider text-cyan-400 uppercase">My Courses</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mt-2">
          Enrolled Courses
        </h1>
      </div>

      {courses.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">You have not enrolled in any course yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#1a1a2e]/60 border border-purple-500/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-pink-500/20 overflow-hidden transition-transform hover:scale-[1.02] group"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-cyan-300 group-hover:text-pink-400 transition-colors">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-300 mt-2 mb-3 leading-relaxed line-clamp-3">
                  {course.description}
                </p>
                <p className="text-sm text-pink-400 mb-2">
                  Category: {course.category}
                </p>
                <p className="text-base font-semibold text-green-400 mb-4">
                  Price: ₹{course.price}
                </p>
                <Link to={`/course-access/${course._id}`}>
                  <button className="w-full py-2 rounded-full bg-gradient-to-r from-pink-600 to-cyan-500 hover:from-pink-500 hover:to-purple-500 transition text-white font-medium shadow-md shadow-pink-500/30">
                    Go to Course
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EnrolledCourses;
