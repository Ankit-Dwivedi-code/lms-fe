// src/components/AdminProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get("https://neuronest-be-production.up.railway.app/api/a2/admin/get-admin", {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.success) {
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

    checkAdminAuth();
  }, []);

  if (checking) {
    return (
      <div className="text-center text-cyan-500 font-semibold text-lg py-10">
        Checking admin authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
