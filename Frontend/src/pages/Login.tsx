import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        { email, password },
        { withCredentials: true } // 👈 Required for cookie-based auth
      );

      const { token, user } = res.data;

      if (user.role === "User") {
        localStorage.setItem("token", token); // Optional if using only cookies
        toast.success("Login successful!", { position: "top-center" });
        navigate("/user-dashboard"); // ✅ Update path as per your routing
      } else {
        toast.error("Access denied: Only user login allowed here", {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl text-white max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-300 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
