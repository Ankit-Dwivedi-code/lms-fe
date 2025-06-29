import React, { useEffect, useState } from 'react';

const FeaturedCourses = () => {
  const [showCourses, setShowCourses] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('courses');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        setShowCourses(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    {
      name: 'MERN Stack',
      description: 'Master React, Node.js, MongoDB & Express for full-stack development.',
      image: '/img/webdev.webp',
      link: '/curriculum-mern-stack'
    },
    {
      name: 'AI & Machine Learning',
      description: 'Dive into ML models, neural networks, and real-world AI applications.',
      image: '/img/AI.webp',
      link: '/curriculum-ai-ml'
    },
    {
      name: 'Data Analytics',
      description: 'Extract actionable insights using Python, SQL, Excel & PowerBI.',
      image: '/img/algo.jpg',
      link: '/curriculum-data-analytics'
    },
    {
      name: 'Data Science',
      description: 'Learn advanced modeling, statistics & machine learning for problem-solving.',
      image: '/img/webdev.webp',
      link: '/curriculum-data-science'
    },
    {
      name: 'DevOps',
      description: 'Integrate CI/CD, Docker & Kubernetes for seamless software delivery.',
      image: '/img/machine_learning.avif',
      link: '/curriculum-devops'
    },
    {
      name: 'QA Engineering',
      description: 'Ensure software reliability with modern testing frameworks and tools.',
      image: '/img/cloud_comp.webp',
      link: '/curriculum-qa'
    }
  ];

  return (
    <section id="courses" className="bg-[#0f0f1b] py-20">
      <div className="container mx-auto px-5 lg:px-20">
        
        <h2 className="text-xl text-center text-gray-400 tracking-wide">
          Dive into expert content and master in-demand skills
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-12">
          Featured Learning Paths
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out transform ${
                showCourses ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } bg-[#1a1a2e]/60 backdrop-blur-md border border-cyan-400/10 hover:border-pink-500/30 rounded-2xl p-6 shadow-lg hover:shadow-pink-500/20`}
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-lg mb-5 border border-gray-700"
              />
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">{course.name}</h3>
              <p className="text-gray-300 text-sm mb-6">{course.description}</p>
              <a
                href={course.link}
                className="inline-block bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
              >
                Check Curriculum →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
