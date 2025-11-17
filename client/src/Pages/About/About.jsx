import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import heroImg from "../../assets/Villa.jpg"; // 🏠 Replace with your own image

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* 🌇 Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between mt-20 md:mt-25 bg-gradient-to-r from-white via-blue-50 to-red-50 overflow-hidden relative">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 space-y-6 text-left z-10">
          <div className="inline-flex items-center   py-1.5 text-sm font-medium">
            <AiOutlineCheckCircle className="mr-2 text-red-500" />
            No Brokerage • Verified Listings
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            About{" "}
            <span className="text-red-500">Deal</span>
            <span className="text-blue-800">Direct</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
            DealDirect connects property buyers, sellers, and renters directly —
            removing brokers, reducing costs, and ensuring every deal is transparent and fair.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-gradient-to-r from-red-500 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300">
              Explore Properties
            </button>
            <button className="border-2 border-blue-800 text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 hover:text-white transition duration-300">
              List Your Property
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-[85vh] overflow-hidden flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-100/40 to-transparent z-10" />
          <img
            src={heroImg}
            alt="DealDirect Home"
            className="w-full h-full object-cover rounded-tl-[300px] md:rounded-tl-[500px] md:rounded-bl-[500px] shadow-2xl"
          />
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-red-200/30 rounded-full blur-3xl"></div>
      </section>

      {/* 🎯 Mission Section */}
      <section className="py-16 md:py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At <span className="text-red-500 font-semibold">DealDirect</span>, our mission is to
              empower individuals to buy, sell, or rent properties without intermediaries.
              We believe real estate should be{" "}
              <span className="text-blue-800 font-semibold">simple, direct,</span> and trustworthy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By combining technology with transparency, we’re building a future where
              property transactions happen with confidence, convenience, and connection.
            </p>
          </div>

          {/* Optional Image */}
          {/* <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
              alt="Modern apartment"
              className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div> */}
        </div>
      </section>

      {/* 🚀 Vision Section */}
      <section className="bg-gradient-to-r from-blue-50 to-red-50 py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            To become India’s most trusted property platform — where every{" "}
            <span className="text-red-500 font-semibold">home buyer</span>,{" "}
            <span className="text-blue-800 font-semibold">seller</span>, and{" "}
            <span className="text-blue-900 font-semibold">builder</span> can connect seamlessly,
            confidently, and directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-red-500 to-blue-800 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Explore Properties
            </button>
            <button className="border-2 border-blue-800 text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 hover:text-white transition">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* 👥 Team Section */}
      <section className="py-16 md:py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-3">Meet the Team</h2>
        <p className="text-gray-600 mb-10">The innovators driving DealDirect forward</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Roshni Bhoi", role: "Founder & CEO", emoji: "👩‍💼" },
            { name: "Rahul Sharma", role: "CTO", emoji: "💻" },
            { name: "Priya Patel", role: "Head of Marketing", emoji: "📣" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <div className="text-blue-800 font-medium">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 💼 CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-800 text-white py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h2 className="text-3xl font-bold mb-3 relative z-10">Start Your Property Journey Today</h2>
        <p className="mb-8 text-lg relative z-10">
          Join thousands who have found their dream property through DealDirect
        </p>
        <button className="bg-white text-blue-800 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition relative z-10">
          Get Started
        </button>
      </section>
    </div>
  );
}
