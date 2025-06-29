import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });

    // Check if user is logged in
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/a2/students/get-student", {
          withCredentials: true,
        });
        setUser(res.data?.data);
      } catch (err) {
        setUser(null); // Not logged in
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="bg-[#0f0f1b] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

        {/* Intro */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
            About NeuroNest
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We’re a futuristic learning hub empowering the next-gen tech leaders with expert-driven courses, personalized mentorship, and hands-on project-based learning.
          </p>
          {!user && (
            <Link
              to="/signup/student"
              className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-cyan-500 px-6 py-3 rounded-full font-semibold text-white hover:from-pink-600 hover:to-purple-500 transition"
            >
              Join Now
            </Link>
          )}
        </div>

        {/* What We Offer */}
        <div className="grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
          <img src="/img/about.png" alt="Learning" className="w-full" />
          <ul className="space-y-6">
            {[
              "Project-Based Curriculum",
              "1:1 Mentorship with Experts",
              "Industry-Ready Skills",
              "Doubt Solving & Career Support",
              "Lifetime Access to Materials",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-lg">
                <FaCheckCircle className="text-pink-500 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses Offered */}
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">Courses We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "MERN Stack Development",
              "Machine Learning & AI",
              "Data Analytics",
              "DevOps & Cloud",
              "Quality Assurance",
              "UI/UX Design",
            ].map((course, i) => (
              <div
                key={i}
                className="bg-[#1a1a2e] p-6 rounded-xl border border-pink-500/20 shadow-md hover:shadow-pink-500/10 transition"
              >
                <h3 className="text-xl font-bold text-pink-400 mb-2">{course}</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive, beginner-friendly to advanced level curriculum with capstone projects.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Instructors */}
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-10">Meet Our Instructors</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Ankit Dwivedi", role: "Full Stack Developer", img: "/img/ankit.jpg" },
              { name: "XYZ Verma", role: "AI/ML Expert", img: "/img/men.png" },
              { name: "ABC Iyer", role: "UI/UX Designer", img: "/img/women.png" },
            ].map((inst, i) => (
              <div
                key={i}
                className="text-center bg-[#1a1a2e] p-6 rounded-xl shadow border border-cyan-400/10"
              >
                <img
                  src={inst.img}
                  alt={inst.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-400"
                />
                <h4 className="text-xl font-semibold text-pink-400">{inst.name}</h4>
                <p className="text-gray-400 text-sm">{inst.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-10">What Learners Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "I gained hands-on skills and landed an internship.",
              "The mentors are amazing and the projects felt real-world!",
            ].map((quote, i) => (
              <div
                key={i}
                className="bg-[#1a1a2e] p-6 rounded-xl border border-pink-500/10 shadow hover:shadow-pink-500/20"
              >
                <FaQuoteLeft className="text-pink-500 text-xl mb-4" />
                <p className="text-gray-300 italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
