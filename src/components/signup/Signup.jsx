import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SignupPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#0f0f1b] text-white px-6 py-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div data-aos="fade-up">
          <h1 className="text-5xl font-extrabold text-cyan-400">Why Join NeuroNest?</h1>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            We are more than just a learning platform. NeuroNest is your launchpad to futuristic careers with hands-on skills, community learning, and real mentorship.
          </p>
          <Link
            to="/signup/student"
            className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-cyan-500 px-8 py-3 rounded-full font-semibold text-white hover:from-pink-600 hover:to-purple-500 transition mt-8"
          >
            Start Your Journey 🚀
          </Link>
        </div>

        <div data-aos="fade-up" className="grid md:grid-cols-2 gap-10 mt-16 text-left">
          <div className="bg-white/5 rounded-lg p-6 border border-cyan-400/20 shadow-md">
            <h3 className="text-2xl font-bold text-pink-400 mb-4">✨ What You Get</h3>
            <ul className="space-y-3 text-gray-300">
              <li>✅ 1-on-1 mentorship with industry experts</li>
              <li>✅ Project-based real-world curriculum</li>
              <li>✅ Career guidance & job prep support</li>
              <li>✅ Doubt solving sessions & community</li>
              <li>✅ Lifetime access to resources</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-cyan-400/20 shadow-md">
            <h3 className="text-2xl font-bold text-pink-400 mb-4">🎓 Built For Students</h3>
            <p className="text-gray-300">
              Whether you're a beginner or a tech enthusiast, NeuroNest adapts to your level. Our interactive content, community, and constant feedback ensure you never feel alone in your journey.
            </p>
          </div>
        </div>

        <div className="mt-20" data-aos="zoom-in">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🌟 Popular Programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["MERN Stack", "AI & Machine Learning", "Frontend Mastery"].map((course, i) => (
              <div key={i} className="bg-[#1a1a2e] p-6 rounded-xl border border-cyan-500/10 hover:shadow-cyan-500/20">
                <h4 className="text-xl font-semibold text-pink-400 mb-2">{course}</h4>
                <p className="text-sm text-gray-300">Deep-dive curriculum with personalized guidance and capstone projects.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Admin/Trainer Links */}
      <div className="absolute bottom-6 right-6 text-right text-sm text-gray-400 space-y-1">
        <p className="text-xs">For internal roles:</p>
        <Link to="/signup/trainer" className="hover:text-cyan-400 underline">Trainer Signup</Link><br />
        <Link to="/signup/admin" className="hover:text-pink-400 underline">Admin Signup</Link>
      </div>
    </div>
  );
};

export default SignupPage;
