import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f1b] text-white px-4 text-center animate-fade-in">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
        404 - Page Not Found
      </h1>

      <p className="text-lg text-gray-300 mb-6">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:opacity-90 transition duration-300"
      >
        Go to Homepage
      </Link>

      <p className="mt-4 text-sm text-gray-500 animate-pulse">
        Redirecting to homepage in 5 seconds...
      </p>
    </div>
  );
};

export default ErrorPage;
