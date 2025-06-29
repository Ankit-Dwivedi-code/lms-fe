import React, { useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaTelegramPlane, FaWhatsapp, FaDiscord, FaUsers, FaRocket } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="bg-[#0f0f1b] text-white py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Heading */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
            Connect with NeuroNest
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Whether you're a learner, partner, or curious mind — reach out through our futuristic channels. No boring forms, just real connection.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {[
            {
              title: "Email Us",
              icon: <FaEnvelope className="text-3xl text-pink-500" />,
              desc: "We're lightning fast on email — drop us your query.",
              contact: "ankitdwivedi4284@gmail.com"
            },
            {
              title: "Call / WhatsApp",
              icon: <FaWhatsapp className="text-3xl text-green-400" />,
              desc: "Ping us anytime between 9am to 9pm.",
              contact: "+91 7488734284"
            },
            {
              title: "Telegram Channel",
              icon: <FaTelegramPlane className="text-3xl text-cyan-400" />,
              desc: "Get instant updates, resources, and support.",
              contact: "@NeuroNestOfficial"
            },
            {
              title: "Join Discord",
              icon: <FaDiscord className="text-3xl text-indigo-400" />,
              desc: "Collaborate, chat, and learn with our tribe.",
              contact: "discord.gg/neuronest"
            },
            {
              title: "Ask in Community",
              icon: <FaUsers className="text-3xl text-yellow-400" />,
              desc: "Find answers, share doubts, and grow together.",
              contact: "forum.neuronest.com"
            },
            {
              title: "Partner With Us",
              icon: <FaRocket className="text-3xl text-purple-400" />,
              desc: "Colleges, startups, and mentors — let’s build the future.",
              contact: "collab@neuronest.tech"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#1a1a2e] p-6 rounded-xl border border-pink-500/10 shadow-md hover:shadow-pink-500/20 transition transform hover:scale-105">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
              <p className="mt-3 text-pink-400 text-sm">{item.contact}</p>
            </div>
          ))}
        </div>

        {/* Location / Map */}
        <div className="text-center space-y-4" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-pink-400">📍 NeuroNest HQ</h2>
          <p className="text-gray-400">Patna, Bihar — Empowering students nationwide.</p>
          <iframe
            className="w-full h-64 rounded-lg border-2 border-cyan-500 shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.635880555124!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed586f5d96a3c3%3A0x8307e1a8491eb01b!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1611824874371"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
