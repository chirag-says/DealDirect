// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/users/login`, formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] mt-10 flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 bg-gradient-to-br from-[#0056B8] to-[#ED1C24] text-white px-8 py-12 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold mb-4">deal<span className="text-yellow-200">direct</span></h1>
          <p className="text-lg leading-relaxed max-w-md opacity-90">Welcome back! Log in to explore verified, broker-free properties.</p>
        </div>

        <div className="md:w-1/2 py-10 px-6 sm:px-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="px-4 py-3 border rounded-xl" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="px-4 py-3 border rounded-xl" />
            <button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600 text-white py-3 rounded-xl">Login</button>
          </form>
          <p className="mt-6 text-sm">Don’t have an account? <a href="/register" className="text-blue-500">Register</a></p>
        </div>
      </div>
    </div>
  );
}
