import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-6">
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-2xl p-12 md:p-20 rounded-3xl border border-blue-500/20 shadow-2xl text-center">
          <h1 className="text-5xl font-extrabold text-blue-300 mb-6">
            Welcome to <span className="text-green-400">Penta Finance</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Empower your financial journey with smart dashboards, real-time analytics, and secure access.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            <div className="bg-gradient-to-br from-blue-700/30 to-blue-900/30 p-6 rounded-2xl shadow-md border border-blue-600/30">
              <h4 className="text-2xl font-semibold text-blue-300 mb-2">📊 Analytics</h4>
              <p className="text-gray-200 text-sm">Visual breakdown of income, expenses, and trends.</p>
            </div>
            <div className="bg-gradient-to-br from-green-700/30 to-green-900/30 p-6 rounded-xl shadow-md border border-green-600/30">
              <h4 className="text-2xl font-semibold text-green-300 mb-2">💡 AI Insights</h4>
              <p className="text-gray-200 text-sm">Tailored financial advice powered by ML.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-700/30 to-purple-900/30 p-6 rounded-xl shadow-md border border-purple-600/30">
              <h4 className="text-2xl font-semibold text-purple-300 mb-2">🔐 Security</h4>
              <p className="text-gray-200 text-sm">Secured with Firebase Auth & Firestore encryption.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 border border-blue-400 text-blue-300 hover:bg-blue-800 rounded-full font-semibold transition"
            >
              Register
            </button>
          </div>

          {/* Admin Login */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/admin-login")}
              className="inline-block bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg"
            >
              🚀 Admin Login
            </button>
            <p className="mt-1 text-xs text-red-400 italic">* Admin use only</p>
          </div>

          <p className="mt-10 text-sm text-gray-400">
            Built with ❤️ by <span className="text-white font-semibold">Team Penta</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
