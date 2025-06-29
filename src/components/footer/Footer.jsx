import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f1b] text-white py-12 border-t border-purple-700/30">
      
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 lg:px-16">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-3">
            NeuroNest
          </h2>
          <p className="text-sm text-gray-400">
            Empowering the next generation of tech innovators with cutting-edge education in AI, Web, Data, and DevOps.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-pink-500 transition">Apply as Instructor</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Hire from Us</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">NeuroNest Team</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Alumni Success</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Follow Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-pink-500 transition"><FaInstagram /> <a href="#">Instagram</a></li>
            <li className="flex items-center gap-2 hover:text-red-500 transition"><FaYoutube /> <a href="#">YouTube</a></li>
            <li className="flex items-center gap-2 hover:text-blue-400 transition"><FaFacebook /> <a href="#">Facebook</a></li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition"><FaLinkedin /> <a href="#">LinkedIn</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>📞 +91 7488734284</li>
            <li>📧 ankitdwivedi4284@gmail.com</li>
            <li>🌍 Patna, Bihar, India</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-xs text-gray-500 px-5">
        <hr className="border-purple-700/30 mb-4" />
        <p>&copy; {new Date().getFullYear()} NeuroNest. All rights reserved.</p>
        <p className="mt-1">Privacy Policy | Terms and Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
