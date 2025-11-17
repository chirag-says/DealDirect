// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", agree: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) return toast.error("Please accept Terms & Privacy");

    try {
      await axios.post(`${API_BASE}/api/users/register`, { name: formData.name, email: formData.email, password: formData.password });
      toast.success("Account created! Please log in");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] mt-20 flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 bg-gradient-to-br from-[#0056B8] to-[#ED1C24] text-white px-8 py-12 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold mb-4">deal<span className="text-yellow-200">direct</span></h1>
          <p className="text-lg max-w-md opacity-90">Create your account to start exploring broker-free properties!</p>
        </div>

        <div className="md:w-1/2 py-10 px-6 sm:px-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="px-4 py-3 border rounded-xl" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="px-4 py-3 border rounded-xl" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="px-4 py-3 border rounded-xl" />

            <label className="flex items-start text-sm">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mr-2" />
              I agree to the Terms & Privacy Policy
            </label>

            <button type="submit" className="bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 rounded-xl">Sign Up</button>
          </form>
          <p className="mt-6 text-sm">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
      </div>
    </div>
  );
}
