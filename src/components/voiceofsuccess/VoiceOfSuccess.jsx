import React, { useEffect } from 'react';

const VoiceOfSuccess = () => {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Full-Stack Developer',
      feedback: 'The courses helped me master technologies quickly. These detailed lessons played a major role in my journey!',
    },
    {
      name: 'Ayush Patel',
      role: 'Data Scientist',
      feedback: 'The data science and AI projects were practical and helped me crack my dream job!',
    },
    {
      name: 'Ankit',
      role: 'Web Developer',
      feedback: 'The course flow was smooth and helped me become confident in responsive design and deployment.',
    },
    {
      name: 'Rohit Kumar',
      role: 'ML Engineer',
      feedback: 'NeuroNest’s ML training opened career opportunities with both theory and real projects.',
    },
    {
      name: 'Amit Verma',
      role: 'Software Engineer',
      feedback: 'I upgraded my coding skills, cracked interviews, and landed at a reputed tech firm!',
    },
    {
      name: 'Roshni Agarwal',
      role: 'UI/UX Designer',
      feedback: 'The design system and principles taught here gave me confidence as a designer.',
    },
  ];

  const loopTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const container = document.getElementById('testimonialCards');
    let interval = setInterval(() => {
      container.scrollLeft += 1.5;
      if (container.scrollLeft >= container.scrollWidth / 3) {
        container.scrollLeft = 0;
      }
    }, 16);

    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        container.scrollLeft += 1.5;
      }, 16);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0f0f1b] py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-10 tracking-tight">
          Voices of Success: Our Students’ Journey
        </h2>

        {/* Card Scroller */}
        <div
          id="testimonialCards"
          className="flex overflow-x-auto space-x-6 scroll-smooth no-scrollbar"
        >
          {loopTestimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[280px] max-w-xs flex-shrink-0 bg-[#1a1a2e]/60 backdrop-blur-md border border-cyan-400/20 hover:border-pink-500/40 rounded-xl p-6 shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{t.name}</h3>
              <p className="text-sm text-pink-400 mb-1 italic">{t.role}</p>
              <p className="text-sm text-gray-200">{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceOfSuccess;
