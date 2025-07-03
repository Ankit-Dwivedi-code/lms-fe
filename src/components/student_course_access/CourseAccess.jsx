import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player';
import { FaStar } from 'react-icons/fa';

const CourseAccess = () => {
  const { courseId } = useParams();
  const [student, setStudent] = useState(null);
  const [videos, setVideos] = useState([]);
  const [review, setReview] = useState({ rating: 0, reviewText: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const st = (await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/students/get-student`, { withCredentials: true })).data.data;
        setStudent(st);
        const vid = (await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/videos/course-videos/${courseId}`, { withCredentials: true })).data.data;
        setVideos(vid);
        const reviews = await axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/${courseId}/reviews`, { withCredentials: true });
        if (reviews.data.success) {
          const existing = reviews.data.data.find(r => r.student === st._id);
          if (existing) {
            setReview({ rating: existing.rating, reviewText: existing.reviewText });
            setSubmitted(true);
          }
        }
      } catch (err) {
        toast.error('Failed loading content');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId]);

  const handleReviewSubmit = async () => {
    if (submitted || review.rating < 1 || !review.reviewText.trim()) {
      toast.error('Please provide a rating & review!');
      return;
    }
    try {
      await axios.post(`https://neuronest-be-production.up.railway.app/api/a2/course/${courseId}/review`, review, { withCredentials: true });
      toast.success('Thank you! Your review is saved.');
      setSubmitted(true);
    } catch {
      toast.error('Unable to send review');
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-[#0f0f1b] text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-6 space-y-8">
      <ToastContainer position="top-center" autoClose={2500}/>

      {student && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400">
          Hey, {student.username}! You made the right decision 🎉
        </h2>
      )}

      <section className="my-6">
        <h3 className="text-2xl font-semibold mb-4">All Course Videos</h3>
        {videos.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v._id} className="bg-[#1a1a2e]/60 rounded-lg p-4 shadow-lg group hover:bg-[#1a1a2e]/80 transition">
                <h4 className="text-lg font-medium mb-2">{v.title}</h4>
                <ReactPlayer
                  url={v.video}
                  light={v.thumbnail}
                  controls
                  width="100%"
                  height="180px"
                />
                <p className="mt-2 text-gray-300 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos available yet. Please check back later.</p>
        )}
      </section>

      <section className="my-6 bg-[#1a1a2e]/60 p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Your Review</h3>

        <div className="flex items-center mb-3">
          {[1,2,3,4,5].map((star) => (
            <FaStar
              key={star}
              onClick={() => !submitted && setReview({ ...review, rating: star })}
              className={`cursor-pointer transition-colors ${star <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
              size={28}
            />
          ))}
        </div>

        <textarea
          disabled={submitted}
          className="w-full p-3 rounded border border-cyan-500/30 bg-[#0f0f1b] text-gray-200 focus:ring-2 focus:ring-pink-500"
          placeholder="Share your thoughts..."
          value={review.reviewText}
          onChange={(e) => setReview({ ...review, reviewText: e.target.value })}
          rows={4}
        />

        <button
          onClick={handleReviewSubmit}
          disabled={submitted}
          className={`mt-4 px-6 py-2 rounded-full font-semibold transition ${
            submitted
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-90'
          }`}
        >
          {submitted ? 'Review Submitted' : 'Submit Review'}
        </button>
      </section>
    </div>
  );
};

export default CourseAccess;
