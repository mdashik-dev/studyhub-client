import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const location = useLocation();
  const { user: userinfo } = useUser();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Announcements", to: "/announcements" },
  ];

  return (
    <nav className="bg-blue-600 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/">StudyHub</Link>
        </div>

        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-white px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                location.pathname.includes("/dashboard") &&
                link.to === "/dashboard"
                  ? "bg-blue-800"
                  : location.pathname === link.to
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="avatar">
                <div className="mask mask-squircle w-12">
                  <img src={userinfo?.photoURL} />
                </div>
              </div>
              <button
                onClick={logout}
                className="text-white px-3 py-2 rounded-md text-lg font-medium transition-colors hover:bg-red-700 bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`text-white px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                location.pathname === "/login"
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block text-white px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                location.pathname.includes("/dashboard") &&
                link.to === "/dashboard"
                  ? "bg-blue-800"
                  : location.pathname === link.to
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-white px-4 py-2 rounded-md text-lg font-medium transition-colors hover:bg-red-700 bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`block text-white px-4 py-2 rounded-md text-lg font-medium transition-colors ${
                location.pathname === "/login"
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
