import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquareLoader } from 'react-spinners';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: '', subjectname: '' });
  const [avatarLoading, setAvatarLoading] = useState(false);

  const fetchTrainer = async () => {
    try {
      const res = await axios.get('https://neuronest-be-production.up.railway.app/api/a2/trainer/get-trainer', {
        withCredentials: true,
      });
      setTrainer(res.data.data);
      setForm({
        username: res.data.data.username,
        subjectname: res.data.data.subjectname,
      });
    } catch {
      toast.error('Failed to load trainer profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('avatar', file);
    setAvatarLoading(true);

    try {
      await axios.patch('https://neuronest-be-production.up.railway.app/api/a2/trainer/update-avatar', data, {
        withCredentials: true,
      });
      toast.success('Avatar updated');
      fetchTrainer();
    } catch {
      toast.error('Failed to update avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.patch('https://neuronest-be-production.up.railway.app/api/a2/trainer/update-details', form, {
        withCredentials: true,
      });
      toast.success('Profile updated!');
      fetchTrainer();
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0f0f1b]">
        <SquareLoader color="#00ffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-gray-400 p-6 flex flex-col items-center">
      <ToastContainer />

      {/* Avatar Section */}
      <div className="relative">
        {avatarLoading ? (
          <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-pink-500 bg-black">
            <SquareLoader size={30} color="#ff69b4" />
          </div>
        ) : (
          <img
            src={trainer?.avatar}
            alt="Trainer Avatar"
            className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover"
          />
        )}
        <label
          htmlFor="avatar"
          className="absolute bottom-0 right-0 bg-cyan-500 text-white p-2 rounded-full cursor-pointer hover:bg-cyan-600"
        >
          <FiEdit2 />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Info Section */}
      <div className="mt-6 w-full max-w-md bg-[#181828] rounded-xl p-6 border border-cyan-500/10 shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cyan-400">Trainer Profile</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-pink-400 hover:text-pink-300"
            >
              <FiEdit2 /> Edit
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleFormChange}
              className="w-full bg-[#0f0f1b] p-2 rounded border border-cyan-500/20 outline-none"
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email (read-only)</label>
            <input
              type="email"
              value={trainer.email}
              readOnly
              className="w-full bg-[#1f1f2b] p-2 rounded border border-cyan-500/10 outline-none cursor-not-allowed text-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Subject</label>
            <input
              id="subjectname"
              type="text"
              value={form.subjectname}
              onChange={handleFormChange}
              className="w-full bg-[#0f0f1b] p-2 rounded border border-cyan-500/20 outline-none"
              readOnly={!editing}
            />
          </div>

          <div className="text-sm text-gray-500">
            Unique Code: <span className="text-cyan-300">{trainer?.uniqueCode}</span>
          </div>

          {editing && (
            <button
              onClick={handleProfileUpdate}
              className="w-full py-2 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-purple-500 font-semibold"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
