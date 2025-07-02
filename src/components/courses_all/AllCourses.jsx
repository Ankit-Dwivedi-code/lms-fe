import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/course/all');
        if (res.data.success) {
          // ✅ Filter only published and approved
          const publishedCourses = res.data.data
            .filter(course => course.isPublished && course.approvalStatus === "Approved")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setCourses(publishedCourses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white py-16 px-6">
      <div className="text-center mb-14">
        <h2 className="text-sm tracking-widest text-cyan-400 uppercase">All Courses</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mt-2">
          Explore Every Path at NeuroNest
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Discover all the tech courses available on NeuroNest. From MERN stack to machine learning, we’ve got your journey covered.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#1a1a2e]/60 border border-pink-500/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-pink-500/20 overflow-hidden transition-transform hover:scale-[1.02] group"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-cyan-300 group-hover:text-pink-400 transition-colors">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-300 mt-2 mb-4 leading-relaxed line-clamp-3">
                  {course.description}
                </p>
                <p className="text-base font-semibold text-green-400 mb-4">
                  Price: ₹{course.price}
                </p>
                <Link to={`/courses/${course._id}`}>
                  <button className="w-full py-2 rounded-full bg-gradient-to-r from-pink-600 to-cyan-500 hover:from-pink-500 hover:to-purple-500 transition text-white font-medium shadow-md shadow-pink-500/30">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-400">No published courses available right now.</p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
