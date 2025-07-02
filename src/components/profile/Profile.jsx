import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarKey, setAvatarKey] = useState(Date.now());
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://neuronest-be-production.up.railway.app/api/a2/students/get-student",
          { withCredentials: true }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.patch(
        "https://neuronest-be-production.up.railway.app/api/a2/students/update-avatar",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser((prev) => ({ ...prev, avatar: response.data.avatar }));
      setAvatarKey(Date.now());
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  if (loading)
    return <div className="text-center py-10 text-lg font-semibold text-cyan-500">Loading...</div>;
  if (!user)
    return <div className="text-center py-10 text-lg font-semibold text-red-500">User not found</div>;

  // Format DOB to DD/MM/YYYY
  const formatDOB = (dob) => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto mt-14 p-6 sm:p-10 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1b] text-white rounded-xl shadow-2xl border border-pink-600/10">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-cyan-400">👤 My Profile</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Avatar Section */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl group cursor-pointer">
          <label className="absolute inset-0 w-full h-full">
            <img
              key={avatarKey}
              src={user.avatar ? `${user.avatar}?t=${avatarKey}` : "/default-avatar.png"}
              alt="Avatar"
              className="w-full h-full object-cover"
              onClick={() => setPreviewOpen(true)}
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Edit Icon */}
            <div className="absolute bottom-1 right-1 bg-cyan-600 p-1 rounded-full shadow-md hover:bg-pink-500 transition">
              <FaEdit className="text-white text-sm" />
            </div>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div className="bg-white/5 p-4 rounded-lg border border-cyan-500/20 shadow-md">
            <h3 className="text-xl font-bold text-pink-400">{user.username}</h3>
            <p className="text-sm text-gray-300">📧 {user.email}</p>
            <p className="text-sm text-gray-300">📞 {user.phone}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg border border-cyan-500/20 shadow-md">
              <p className="text-cyan-300 font-semibold mb-1">🎓 Highest Qualification</p>
              <p className="text-gray-200 text-sm">{user.highestQualification || "Not provided"}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-cyan-500/20 shadow-md">
              <p className="text-cyan-300 font-semibold mb-1">🎂 Date of Birth</p>
              <p className="text-gray-200 text-sm">
                {user.dateOfBirth ? formatDOB(user.dateOfBirth) : "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-sm w-full mx-auto p-4">
            <img
              src={user.avatar}
              alt="Avatar Preview"
              className="w-full rounded-lg border-4 border-cyan-400"
            />
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
