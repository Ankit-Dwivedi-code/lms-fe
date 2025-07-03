import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import ReactPlayer from 'react-player/lazy'; // use lazy loader
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
    async function load() {
      try {
        const [stRes, vidRes] = await Promise.all([
          axios.get(`/api/a2/students/get-student`, { withCredentials: true }),
          axios.get(`/api/a2/videos/course-videos/${courseId}`, { withCredentials: true })
        ]);
        setStudent(stRes.data.data);
        setVideos(vidRes.data.data);
        console.log('Loaded videos:', vidRes.data.data);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load course.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  const handleReview = async () => {
    if (submitted || review.rating < 1 || !review.reviewText.trim()) {
      return toast.error('Please add rating & review');
    }
    try {
      await axios.post(`/api/a2/course/${courseId}/review`, review, { withCredentials: true });
      toast.success('Review submitted 👍');
      setSubmitted(true);
    } catch {
      toast.error('Failed to submit review.');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white p-6 space-y-10">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-3xl font-bold text-cyan-400 text-center">
        Welcome, {student?.username}, you’ve made the right choice 🎉
      </h2>

      {/* Videos */}
      <section>
        <h3 className="text-2xl text-center text-pink-400 mb-6">Course Videos</h3>
        {videos.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map(v => (
              <div key={v._id} className="bg-[#1a1a2e]/70 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-cyan-300 mb-2">{v.title}</h4>
                <div className="w-full aspect-video bg-black rounded overflow-hidden">
                  <ReactPlayer
                    url={v.video}
                    controls
                    width="100%"
                    height="100%"
                    pip={true}
                  />
                </div>
                <p className="mt-3 text-gray-300">{v.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No videos available yet.</p>
        )}
      </section>

      {/* Review */}
      <section className="bg-[#1a1a2e]/80 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h3 className="text-2xl text-center text-pink-400 mb-4">Leave a Review</h3>
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(st => (
            <FaStar
              key={st}
              size={30}
              className={`cursor-pointer ${st <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
              onClick={() => !submitted && setReview(r => ({ ...r, rating: st }))}
            />
          ))}
        </div>
        <textarea
          rows={4}
          className="w-full p-4 bg-[#0f0f1b] border border-cyan-500/30 rounded"
          placeholder="Write your review..."
          disabled={submitted}
          value={review.reviewText}
          onChange={e => setReview(r => ({ ...r, reviewText: e.target.value }))}
        />
        <button
          className={`w-full mt-4 py-2 rounded-full ${submitted ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-cyan-500'}`}
          onClick={handleReview}
          disabled={submitted}
        >
          {submitted ? 'Reviewed 👍' : 'Submit Review'}
        </button>
      </section>
    </div>
  );
};

export default CourseAccess;
