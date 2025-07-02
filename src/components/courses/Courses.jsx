import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/course/all');
        if (res.data.success) {
          // ✅ Filter only published & approved courses
          const filtered = res.data.data.filter(
            (course) => course.isPublished && course.approvalStatus === "Approved"
          );

          // ✅ Sort by createdAt and take latest 3
          const latestCourses = filtered
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

          setCourses(latestCourses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="bg-[#0f0f1b] text-white py-16 px-5">
      <div className="text-center mb-14">
        <h2 className="text-base font-medium tracking-wide text-cyan-400 uppercase">
          Latest Courses
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mt-2">
          Upskill with NeuroNest
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-[#1a1a2e]/60 border border-pink-500/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-pink-500/20 overflow-hidden transition-transform hover:scale-[1.02] group"
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="w-full h-36 object-cover"
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
                  Explore Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {courses.length > 0 && (
        <div className="mt-14 text-center">
          <Link to="/all-courses">
            <button className="inline-block px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:opacity-90 transition duration-300">
              View All Courses
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Courses;
