import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Contact Us
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-center">
          <p className="text-lg text-gray-700 mb-6">
            We’re always here to help! If you have any questions or concerns,
            please reach out to us, and we’ll get back to you as soon as
            possible.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <i className="fas fa-map-marker-alt mr-4"></i>
              <p>123 StudyHub St, Learn City, 12345</p>
            </div>
            <div className="flex items-center text-gray-700">
              <i className="fas fa-phone-alt mr-4"></i>
              <p>+1 234 567 890</p>
            </div>
            <div className="flex items-center text-gray-700">
              <i className="fas fa-envelope mr-4"></i>
              <p>support@studyhub.com</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full p-4 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input input-bordered w-full p-4 rounded-lg"
              required
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full p-4 rounded-lg"
            required
          />
          <button type="submit" className="btn btn-primary w-full py-4 text-lg">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
