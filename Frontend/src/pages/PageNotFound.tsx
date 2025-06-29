import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white px-6">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-blue-400 drop-shadow-lg">404</h1>
        <h2 className="text-3xl font-bold text-white">Oops! Page Not Found</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition shadow-lg"
        >
          ⬅ Go Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
