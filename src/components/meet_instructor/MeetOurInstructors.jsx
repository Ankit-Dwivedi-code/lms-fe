import React, { useState } from 'react';
import './MeetOurInstructors.css';

const instructors = [
  {
    name: 'Mr. Arjun Verma',
    role: 'Lead Data Scientist',
    image: '/img/men.png',
    bio: 'Arjun specializes in advanced machine learning models and statistical analytics. He mentors students through hands-on, project-based learning.',
  },
  {
    name: 'Ms. Nidhi Iyer',
    role: 'UI/UX Architect',
    image: '/img/women.png',
    bio: 'Nidhi transforms ideas into elegant interfaces. Her sessions blend design theory with Figma and prototyping best practices.',
  },
  {
    name: 'Mr. Raghav Patel',
    role: 'AI & ML Engineer',
    image: '/img/men.png',
    bio: 'Raghav trains students in AI pipelines, NLP, and deep learning using TensorFlow and PyTorch with real-world datasets.',
  },
  {
    name: 'Ankit Dwivedi',
    role: 'Full-Stack Developer',
    image: '/img/ankit.jpg',
    bio: 'Ankit is a versatile full-stack developer skilled in React, Node.js, MongoDB, and building scalable web apps from scratch.',
  },
];

const MeetOurInstructors = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const openModal = (instructor) => setSelectedInstructor(instructor);
  const closeModal = () => setSelectedInstructor(null);

  return (
    <section className="py-16 bg-[#0f0f1b] text-white">
      <div className="container mx-auto px-5 lg:px-20">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-12">
          Meet Our Instructors
        </h2>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              onClick={() => openModal(instructor)}
              className="bg-[#1a1a2e] rounded-xl p-6 shadow-md hover:shadow-pink-500/20 transition-all duration-300 text-center cursor-pointer backdrop-blur-md hover:scale-105"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-cyan-400 shadow-sm"
              />
              <h3 className="text-xl font-semibold text-cyan-300">{instructor.name}</h3>
              <p className="text-sm text-gray-400">{instructor.role}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedInstructor && (
          <div className="modal-overlay">
            <div className="modal-content-glass">
              <img
                src={selectedInstructor.image}
                alt={selectedInstructor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-400"
              />
              <h2 className="text-2xl font-bold text-pink-400 mb-1">{selectedInstructor.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{selectedInstructor.role}</p>
              <p className="text-gray-200">{selectedInstructor.bio}</p>
              <button onClick={closeModal} className="mt-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetOurInstructors;
