import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaSearch, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const exploreDropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://neuronest-be-production.up.railway.app/api/a2/students/get-student",
          { withCredentials: true }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target)) {
        setShowExploreDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
    <header className="w-full bg-[#0f0f1b] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-cyan-400 drop-shadow-md">
          NeuroNest
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
          <Link to="/about" className="hover:text-pink-400 transition">About</Link>

          <div className="relative" ref={exploreDropdownRef}>
            <div
              className="flex items-center space-x-1 hover:text-pink-400 cursor-pointer transition"
              onClick={() => setShowExploreDropdown(!showExploreDropdown)}
            >
              <span>Courses</span>
              <FaChevronDown className="text-xs" />
            </div>
            {showExploreDropdown && (
              <div className="absolute mt-2 left-0 bg-[#1c1c2e] border border-pink-500 rounded shadow-lg w-48 z-50">
                {["AI ML", "Data Analytics", "Data Science", "Mern Stack", "DevOps", "QA"].map((course) => (
                  <Link
                    key={course}
                    to={`/curriculum-${course.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-4 py-2 text-sm hover:bg-[#2b2b40] text-white"
                  >
                    {course}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
        </nav>

        {/* Right Section (Desktop) */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {/* <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-12 py-2 w-72 bg-[#1f1f2e] text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="absolute right-3 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
              <FaSearch />
            </button>
          </div> */}

          {/* Auth/Profile */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-cyan-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#1c1c2e] border border-pink-500 rounded-md shadow-md z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-[#2b2b40] text-white">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-[#2b2b40] text-white">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/auth/a2/login" className="hover:text-pink-400 transition">Login</Link>
              <Link
                to="/auth/a2/signup"
                className="bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 rounded-3xl text-white hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-xl text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden px-6 py-4 bg-[#0f0f1b] border-t border-gray-800 space-y-3">
          <Link to="/about" className="block text-white hover:text-pink-400 transition">About</Link>

          <div className="relative">
            <div
              className="flex items-center justify-between text-white hover:text-pink-400 cursor-pointer"
              onClick={() => setShowExploreDropdown(!showExploreDropdown)}
            >
              <span>Courses</span>
              <FaChevronDown className="text-xs" />
            </div>
            {showExploreDropdown && (
              <div className="mt-2 bg-[#1c1c2e] border border-pink-500 rounded shadow-lg w-full z-50">
                {["AI ML", "Data Analytics", "Data Science", "Mern Stack", "DevOps", "QA"].map((course) => (
                  <Link
                    key={course}
                    to={`/curriculum-${course.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#2b2b40]"
                  >
                    {course}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="block text-white hover:text-pink-400 transition">Contact</Link>

          {user ? (
            <>
              <Link to="/profile" className="block text-white hover:text-pink-400">Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-white hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/a2/login" className="block text-white hover:text-pink-400">Login</Link>
              <Link
                to="/auth/a2/signup"
                className="block bg-gradient-to-r from-pink-500 to-cyan-500 text-center px-4 py-2 rounded-full text-white hover:opacity-90 transition"
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
