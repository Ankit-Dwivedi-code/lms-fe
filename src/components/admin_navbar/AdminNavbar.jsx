import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { SquareLoader } from 'react-spinners';

const AdminNavbar = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminDetails();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/admin/get-admin', {
        withCredentials: true,
      });
      setAdmin(res.data.data);
    } catch (err) {
      console.error('Error fetching admin:', err);
      navigate('/admin-login');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://neuronest-be-production.up.railway.app/api/a2/admin/log-out', {}, {
        withCredentials: true,
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#0f0f1b] py-4 flex justify-center items-center">
        <SquareLoader size={30} color="#00ffff" />
      </div>
    );
  }

  return (
    <nav className="bg-[#0f0f1b] border-b border-pink-500/10 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-cyan-400">NeuroNest Admin</div>

        {/* Right Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={admin?.avatar}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-pink-400 object-cover"
            />
            <FiChevronDown className="text-white" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#181828] rounded shadow-lg z-50">
              <div className="p-4 border-b border-pink-400/20">
                <p className="text-white font-semibold text-sm truncate">{admin?.name}</p>
                <p className="text-gray-400 text-xs truncate">{admin?.email}</p>
              </div>
              <button
                onClick={() => navigate('/admin-profile')}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-cyan-600 flex items-center gap-2"
              >
                <FiUser /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-pink-400 hover:bg-pink-600 hover:text-white flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
