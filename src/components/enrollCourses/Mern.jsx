import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const res = await fetch(
          `https://neuronest-be-production.up.railway.app/api/a2/course/get/${courseId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success) setCourse(data.data);
        else toast.error("Course not found");

        // Fetch enrollment status
        const enrollRes = await fetch(
          `https://neuronest-be-production.up.railway.app/api/a2/students/check-enrolled-courses/${courseId}`,
          { credentials: "include" }
        );
        const enrollData = await enrollRes.json();
        if (enrollData.success && enrollData.data?.isEnrolled) {
          setIsEnrolled(true);
        }
      } catch (err) {
        console.error("Error loading course or enrollment:", err);
        toast.error("Error loading course details.");
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
    if (!course) return;
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
        key: "rzp_test_Bp55NAok5a31TY",
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
            console.error("Error during payment verification:", err);
            toast.error("Enrollment verification failed.");
          }
        },
        prefill: {
          name: "NeuroNest User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#8e2de2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment process failed.");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            {course.courseName}
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            <span className="font-medium text-pink-400">Level:</span>{" "}
            {course.level}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            <span className="font-medium text-pink-400">Language:</span>{" "}
            {course.language}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            <span className="font-medium text-pink-400">Category:</span>{" "}
            {course.category}
          </p>
          <p className="text-gray-400 mt-4 mb-6 leading-relaxed">
            {course.description}
          </p>

          <div className="text-xl font-semibold text-green-400 mb-6">
            Price: ₹{course.price}
          </div>

          {/* Conditional Button */}
          {isEnrolled ? (
            <button
              onClick={() => navigate(`/course-access/${courseId}`)}
              className="px-6 py-3 rounded-full font-semibold transition-all shadow-lg bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-blue-500"
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
            className="rounded-2xl shadow-[0_0_40px_rgba(255,0,150,0.2)] max-w-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
