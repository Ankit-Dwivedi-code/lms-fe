import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    avatar: null,
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/students/get-student', {
          withCredentials: true,
        });
        setUserData(response.data);
        setFormData({ ...formData, name: response.data.name });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }
    if (formData.password) {
      formDataToSend.append('password', formData.password);
    }

    try {
      await axios.patch('https://neuronest-be-production.up.railway.app/api/a2/students/update-avatar', formDataToSend, {
        withCredentials: true,
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const goToEnrolledCourses = () => {
    navigate('/enrolled-courses');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen text-white bg-[#0f0f1b]">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">My Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-5">
        <div>
          <label className="block mb-2 text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-500 rounded-md p-2 bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-300">Avatar</label>
          <input
            type="file"
            name="avatar"
            onChange={handleInputChange}
            className="w-full bg-transparent text-gray-100"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Change password"
            onChange={handleInputChange}
            className="w-full border border-gray-500 rounded-md p-2 bg-transparent text-white"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={goToEnrolledCourses}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Go to Enrolled Courses
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
