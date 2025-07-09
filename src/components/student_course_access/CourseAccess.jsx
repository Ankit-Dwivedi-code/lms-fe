import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        const [studentRes, videoRes, reviewedRes] = await Promise.all([
          axios.get(`https://neuronest-be-production.up.railway.app/api/a2/students/get-student`, { withCredentials: true }),
          axios.get(`https://neuronest-be-production.up.railway.app/api/a2/videos/course-videos/${courseId}`, { withCredentials: true }),
          axios.get(`https://neuronest-be-production.up.railway.app/api/a2/course/${courseId}/reviewed`, { withCredentials: true }),
        ]);

        setStudent(studentRes.data.data);
        setVideos(videoRes.data.data);
        setSubmitted(reviewedRes.data.data?.reviewed); // if true, hide review form
      } catch (err) {
        toast.error('Failed to load course content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [courseId]);

  const handleReviewSubmit = async () => {
    if (submitted || review.rating < 1 || !review.reviewText.trim()) {
      toast.error('Please provide both rating and review!');
      return;
    }
    try {
      await axios.post(`https://neuronest-be-production.up.railway.app/api/a2/course/${courseId}/review`, review, { withCredentials: true });
      toast.success('🎉 Thank you! Your review has been submitted.');
      setSubmitted(true);
    } catch {
      toast.error('Unable to submit review. Try again.');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f0f1b] text-white text-xl animate-pulse">
        Loading your course...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] to-[#1a1a2e] text-white p-6 space-y-10">
      <ToastContainer position="top-center" autoClose={2500} theme="dark" />

      {student && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center">
          Welcome, {student.username}! 🚀 You’ve made a great decision by enrolling.
        </h2>
      )}

      {/* Course Videos */}
      <section className="my-10">
        <h3 className="text-2xl font-semibold mb-6 text-pink-400 text-center">📚 Course Video Lessons</h3>
        {videos.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v) => (
              <div key={v._id} className="bg-[#1f1f2e] border border-cyan-500/20 rounded-lg p-4 shadow-xl hover:shadow-cyan-500/30 transition-all duration-300">
                <h4 className="text-lg font-bold mb-2 text-cyan-300">{v.title}</h4>
                <div className="rounded overflow-hidden">
                  <video
                    src={v.video}
                    poster={v.thumbnail}
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-56 rounded-lg bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-sm mt-3 text-gray-300">{v.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">⚠️ No videos available for this course yet.</p>
        )}
      </section>

      {/* Review Section */}
      {!submitted && (
        <section className="bg-[#1a1a2e]/80 p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-pink-500/20">
          <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">📝 Leave a Review</h3>

          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setReview({ ...review, rating: star })}
                className={`cursor-pointer transition-colors ${
                  star <= review.rating ? 'text-yellow-400' : 'text-gray-600'
                }`}
                size={30}
              />
            ))}
          </div>

          <textarea
            className="w-full p-4 rounded-lg border border-cyan-500/30 bg-[#0f0f1b] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-pink-400 outline-none"
            placeholder="Share how this course helped you grow or what you liked..."
            value={review.reviewText}
            onChange={(e) => setReview({ ...review, reviewText: e.target.value })}
            rows={4}
          />

          <button
            onClick={handleReviewSubmit}
            className="w-full mt-4 py-3 rounded-full font-semibold text-white text-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-cyan-500 transition-all"
          >
            ✨ Submit Review
          </button>
        </section>
      )}
    </div>
  );
};

export default CourseAccess;
