import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://neuronest-be-production.up.railway.app/api/a2/students/get-student",
          { withCredentials: true }
        );
        setUser(res.data.data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://neuronest-be-production.up.railway.app/api/a2/students/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0f0f1bdd] backdrop-blur-lg shadow-md border-b border-cyan-500/10">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-cyan-400 drop-shadow-md"
        >
          NeuroNest
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-white">
          <Link to="/about" className="hover:text-pink-400 transition">About</Link>
          <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-cyan-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/a2/login" className="hover:text-pink-400">Login</Link>
              <Link
                to="/auth/a2/signup"
                className="bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 rounded-full text-white hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="md:hidden px-6 py-6 bg-[#0f0f1b] border-t border-gray-800 space-y-4 text-white text-base"
        >
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-400">
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-400">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block hover:text-cyan-400">
                Profile
              </Link>
              <button onClick={handleLogout} className="block w-full text-left hover:text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/a2/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-pink-400">
                Login
              </Link>
              <Link
                to="/auth/a2/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 text-center text-white rounded-full hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
