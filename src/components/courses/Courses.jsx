import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courseData = [
    {
      title: 'MERN Stack Development',
      description: 'Build scalable full-stack apps with MongoDB, Express, React & Node.js — from scratch to deployment.',
      fee: '₹34,999',
      link: "/course-Mern",
      image: 'https://wallpapercave.com/wp/wp8903890.jpg',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Learn real-world ML models, neural nets, and AI pipelines using Python, TensorFlow, and more.',
      fee: '₹44,999',
      link: "/course-ML",
      image: 'https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg',
    },
    {
      title: 'Data Analytics Mastery',
      description: 'Master Excel, SQL, Power BI & Python to uncover and visualize insights from raw data.',
      fee: '₹19,999',
      link: "/course-DataAnalytics",
      image: 'https://www.purplescape.com/wp-content/uploads/2022/08/Old-Blog-Banners-Purplescape-85.jpg',
    },
    {
      title: 'DevOps & CloudOps',
      description: 'Automate, deploy, and scale apps with CI/CD, Docker, Kubernetes, and cloud workflows.',
      fee: '₹14,999',
      link: "/course-Devops",
      image: 'https://t3.ftcdn.net/jpg/05/12/04/52/360_F_512045284_gsbCu75oyqHo59MccBltJe0sJRck1PPa.jpg',
    },
    {
      title: 'QA Automation Engineering',
      description: 'Test smarter using Selenium, JMeter & Cypress. Build robust automation frameworks.',
      fee: '₹18,999',
      link: "/course-QA",
      image: 'https://www.shutterstock.com/image-illustration/quality-assurance-software-flow-qa-260nw-2324541683.jpg',
    },
    {
      title: 'Cybersecurity Essentials',
      description: 'Learn the core principles of network security, ethical hacking, firewalls, and securing digital infrastructure.',
      fee: '₹22,999',
      link: "/course-Cybersecurity",
      image: 'https://img.freepik.com/free-photo/futuristic-cyber-lock-digital-background-security-technology-3d-render_71163-382.jpg',
    },
  ];

  return (
    <section className="bg-[#0f0f1b] text-white py-16 px-5">
      <div className="text-center mb-14">
        <h2 className="text-base font-medium tracking-wide text-cyan-400 uppercase">
          Featured Certifications
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mt-2">
          Upskill with NeuroNest
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courseData.map((course, index) => (
          <div
            key={index}
            className="bg-[#1a1a2e]/60 border border-pink-500/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-pink-500/20 overflow-hidden transition-transform hover:scale-[1.02] group"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-36 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-cyan-300 group-hover:text-pink-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2 mb-4 leading-relaxed">{course.description}</p>
              <p className="text-base font-semibold text-green-400 mb-4">Fee: {course.fee}</p>
              <Link to={course.link}>
                <button className="w-full py-2 rounded-full bg-gradient-to-r from-pink-600 to-cyan-500 hover:from-pink-500 hover:to-purple-500 transition text-white font-medium shadow-md shadow-pink-500/30">
                  Explore Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
