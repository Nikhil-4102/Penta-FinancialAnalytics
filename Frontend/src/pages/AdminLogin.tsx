import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        { email, password },
        { withCredentials: true } // To enable cookies
      )

      const { token, user } = res.data

      if (user.role === "Admin") {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        toast.success("Admin login successful", {
          position: "top-center",
          autoClose: 3000,
        })

        navigate("/Admin-Dashboard")
      } else {
        toast.error("Access denied: Not an admin", {
          position: "bottom-center",
          autoClose: 3000,
        })
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data?.message || "Login failed", {
        position: "bottom-center",
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1c22] px-4">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl text-white max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Admin Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-gray-300 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter admin email"
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
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition"
        >
          🚀 Login as Admin
        </button>

        <p className="mt-4 text-xs text-center text-red-400 italic">
          * Only Admin credentials allowed
        </p>
      </form>
    </div>
  )
}

export default AdminLogin
