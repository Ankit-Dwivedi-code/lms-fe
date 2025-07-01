import React from 'react';
import { FiShield, FiZap, FiUserCheck, FiBookOpen, FiBarChart2, FiCpu } from 'react-icons/fi';

const features = [
  {
    icon: <FiZap size={32} className="text-pink-400" />,
    title: 'Industry-Relevant Curriculum',
    description: 'Courses designed with real-world applications and job readiness in mind.',
  },
  {
    icon: <FiCpu size={32} className="text-cyan-400" />,
    title: 'AI-Powered Assistance',
    description: 'Chat with our smart AI bot to resolve doubts, get guidance and stay on track.',
  },
  {
    icon: <FiUserCheck size={32} className="text-purple-400" />,
    title: 'Expert Trainers',
    description: 'Learn from experienced developers and college mentors who know what matters.',
  },
  {
    icon: <FiBookOpen size={32} className="text-yellow-400" />,
    title: 'Project-Based Learning',
    description: 'Complete real projects to showcase in your portfolio and resume.',
  },
  {
    icon: <FiShield size={32} className="text-green-400" />,
    title: 'Secure Access',
    description: 'OTP-authenticated login for both students and trainers ensures privacy.',
  },
  {
    icon: <FiBarChart2 size={32} className="text-orange-400" />,
    title: 'Lifetime Access',
    description: 'All enrolled courses stay with you forever — come back anytime.',
  },
];

const WhyNeuroNest = () => {
  return (
    <section className="bg-[#0f0f1b] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl text-gray-400 tracking-wide mb-2">What makes us different?</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-16">
          Why NeuroNest?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#181828] p-6 rounded-2xl border border-cyan-500/10 hover:border-pink-500/30 hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNeuroNest;
