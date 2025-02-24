import React from "react";

function Banner() {
  return (
    <section className="hero min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Welcome to Our Learning Platform
          </h1>
          <p className="text-lg mb-6">
            Join our interactive study sessions and expert tutors to help you
            achieve your academic goals. Start learning today!
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="btn btn-primary text-white px-8 py-3 rounded-lg shadow-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
        {/* Right Section (Image) */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://accessally.com/wp-content/uploads/2023/07/accessally-featured-image-elearning-platform-development-1024x676.png.webp"
            alt="Learning Platform"
            className="w-full max-w-lg mx-auto rounded-xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default Banner;
