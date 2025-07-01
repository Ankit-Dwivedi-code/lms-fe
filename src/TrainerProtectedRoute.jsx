// src/components/TrainerProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const TrainerProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkTrainerAuth = async () => {
      try {
        const res = await axios.get("https://neuronest-be-production.up.railway.app/api/a2/trainer/get-trainer", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkTrainerAuth();
  }, []);

  if (checking) {
    return (
      <div className="text-center text-cyan-500 font-semibold text-lg py-10">
        Checking trainer authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/trainer/login" replace />;
  }

  return children;
};

export default TrainerProtectedRoute;
