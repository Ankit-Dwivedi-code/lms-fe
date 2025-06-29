import React, { useState } from 'react';
import './FAQAccordion.css'; // Custom neon styles

const FAQs = [
  {
    question: 'What is the purpose of this platform?',
    answer: 'NeuroNest empowers learners with AI-powered, project-based courses in tech, preparing them for real-world innovation.',
  },
  {
    question: 'How can I enroll in a course?',
    answer: 'Create an account, explore our futuristic tech stack, and join any course with one click. Your journey starts now.',
  },
  {
    question: 'What support is available for students?',
    answer: '24/7 mentor access, AI assistants, peer discussion forums, and live doubt-solving sessions ensure you’re never stuck.',
  },
  {
    question: 'Are there any prerequisites for the courses?',
    answer: 'Most courses are beginner-friendly. Advanced tracks may have tech prerequisites, clearly mentioned on each course page.',
  },
  {
    question: 'Will I receive a certificate after completing a course?',
    answer: 'Yes, earn verifiable digital certificates to share on LinkedIn and boost your career credibility.',
  },
  {
    question: 'Can I access course materials after the course ends?',
    answer: 'Absolutely. Enjoy lifetime access to all enrolled course content and any future updates.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click “Forgot Password” on the login page and follow the reset link sent to your registered email.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes, you’re covered by our 30-day risk-free satisfaction guarantee.',
  },
];

const FAQAccordion = () => {
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const displayedFAQs = showAll ? FAQs : FAQs.slice(0, 3);

  return (
    <section className="faq-section py-16 bg-[#0f0f1b] text-white">
      <div className="container mx-auto px-5 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-10 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
            Frequently Asked Questions
          </span>
        </h2>

        <div className="space-y-5">
          {displayedFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a2e] border border-purple-600/30 rounded-xl shadow-lg transition-all hover:shadow-pink-500/30"
            >
              <div
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center px-6 py-4 cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-xl text-purple-400">
                  {expandedQuestions.includes(index) ? '-' : '+'}
                </span>
              </div>
              {expandedQuestions.includes(index) && (
                <div className="px-6 pb-5 text-sm text-gray-300 transition-all">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:opacity-90 transition"
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
