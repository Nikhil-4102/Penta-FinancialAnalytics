import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/signup",
        {
          name,
          email,
          password,
          role: "User",
        },
        { withCredentials: true }
      );

      toast.success("Signup successful! Please login.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-800 to-purple-900 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl text-white max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-purple-300 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
