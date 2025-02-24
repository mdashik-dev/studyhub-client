import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Our Learning Platform</h3>
        <p className="text-sm mt-4">
          © 2025 Our Platform. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-8 mt-6">
          <a href="#" className="text-white hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            Terms of Service
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
