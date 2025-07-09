import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, enrollRes, studentRes] = await Promise.all([
          fetch(`https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`, {
            credentials: "include",
          }),
          fetch(`https://neuronest-be-production.up.railway.app/api/a2/students/check-enrolled-courses/${courseId}`, {
            credentials: "include",
          }),
          fetch(`https://neuronest-be-production.up.railway.app/api/a2/students/get-student`, {
            credentials: "include",
          }),
        ]);

        const courseData = await courseRes.json();
        const enrollData = await enrollRes.json();
        const studentData = await studentRes.json();

        if (courseData.success) setCourse(courseData.data);
        if (enrollData.success && enrollData.data?.isEnrolled) setIsEnrolled(true);
        if (studentData.success) setStudent(studentData.data);

      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [courseId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!course || !student) return;
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://neuronest-be-production.up.railway.app/api/a2/pay/initialize-payment/${courseId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!data.success || !data.data?.id) {
        toast.error("Failed to initialize payment.");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ From .env
        amount: data.data.amount,
        currency: "INR",
        name: course.courseName,
        description: course.description,
        order_id: data.data.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              `https://neuronest-be-production.up.railway.app/api/a2/pay/verify-payment/${courseId}`,
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Enrollment successful!");
              navigate(`/course-access/${courseId}`);
            } else {
              toast.error("Verification failed: " + verifyData.message);
            }
          } catch (err) {
            toast.error("Verification error.");
          }
        },
        prefill: {
          name: student.username || "",
          email: student.email || "",
          contact: student.phone || "",
        },
        theme: { color: "#8e2de2" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  const avgRating =
    course?.reviews?.length > 0
      ? Math.round(
          course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
        )
      : course?.ratings;

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f1b] text-white">
        <h2 className="text-xl animate-pulse">Loading course details...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] text-white px-5 py-12">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Course Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">{course.courseName}</h1>

          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < avgRating ? "text-yellow-400" : "text-gray-500"}
              />
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-4">
            ({course.reviews?.length || 0} Reviews)
          </p>
          <p className="text-lg text-gray-300 mb-1">
            <span className="font-semibold text-pink-400">Level:</span> {course.level}
          </p>
          <p className="text-lg text-gray-300 mb-1">
            <span className="font-semibold text-pink-400">Language:</span> {course.language}
          </p>
          <p className="text-lg text-gray-300 mb-1">
            <span className="font-semibold text-pink-400">Category:</span> {course.category}
          </p>

          <p className="text-gray-400 my-4">{course.description}</p>

          <div className="text-xl font-semibold text-green-400 mb-6">
            Price: ₹{course.price}
          </div>

          {isEnrolled ? (
            <button
              onClick={() => navigate(`/course-access/${courseId}`)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-blue-500 font-semibold"
            >
              Go to Course
            </button>
          ) : (
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`px-6 py-3 rounded-full font-semibold transition-all shadow-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-cyan-500"
              }`}
            >
              {loading ? "Processing Payment..." : "Enroll Now"}
            </button>
          )}
        </div>

        {/* Thumbnail */}
        <div className="flex-1 flex justify-center">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="rounded-2xl shadow-[0_0_40px_rgba(255,0,150,0.3)] max-w-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
