import React from "react";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* 🌟 Hero Section */}
      <section className="bg-gradient-to-r !mt-25 from-[#ED1C24] to-[#0056B8] text-white py-20 text-center shadow-md">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            We’re here to help you find or list your dream property. Reach out
            to us for inquiries, partnerships, or support.
          </p>
        </div>
      </section>

      {/* 💬 Contact Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 📩 Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-[#0056B8]">
              Send us a message
            </h2>
            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056B8]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056B8]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056B8]"
                />
              </div>
              <div>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0056B8]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ED1C24] to-[#0056B8] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* 🏢 Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#ED1C24]">
              Contact Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>📍 <strong>Office:</strong> 123 Real Estate Avenue, Mumbai, India</li>
              <li>📞 <strong>Phone:</strong> +91 98765 43210</li>
              <li>✉️ <strong>Email:</strong> support@dealdirect.in</li>
              <li>🕒 <strong>Working Hours:</strong> Mon–Sat: 9:00 AM – 7:00 PM</li>
            </ul>

            {/* 📍 Map */}
            <div className="rounded-xl overflow-hidden shadow-md mt-6 border border-[#0056B8]/20">
              <iframe
                title="Deal Direct Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4363325116217!2d72.87765507504482!3d19.172347350047146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a79b1e1a3%3A0x9d02e5d8907f03!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1692989478342!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
