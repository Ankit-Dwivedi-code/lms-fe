// src/components/StudentCourseProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(null); // null = checking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await axios.get(
          `https://neuronest-be-production.up.railway.app/api/a2/students/check-enrolled-courses/${courseId}`,
          { withCredentials: true }
        );

        if (res.data.success && res.data.data?.isEnrolled) {
          setIsEnrolled(true);
        } else {
          setIsEnrolled(false);
        }
      } catch (err) {
        setIsEnrolled(false);
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [courseId]);

  if (loading) {
    return (
      <div className="text-center text-cyan-500 font-semibold text-lg py-10">
        Verifying course access...
      </div>
    );
  }

  if (!isEnrolled) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  return children;
};

export default StudentCourseProtectedRoute;
