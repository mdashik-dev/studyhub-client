import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaCalendarPlus,
  FaCalendarAlt,
  FaUpload,
  FaBook,
  FaHistory,
} from "react-icons/fa";

const TutorDashboard = () => {
  const { pathname } = useLocation();

  const navLinks = [
    {
      name: "Create Study Session",
      to: "/dashboard/tutor",
      icon: <FaCalendarPlus />,
    },
    {
      name: "View Study Sessions",
      to: "/dashboard/tutor/view-sessions",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Upload Materials",
      to: "/dashboard/tutor/upload-materials",
      icon: <FaUpload />,
    },
    {
      name: "View Materials",
      to: "/dashboard/tutor/view-materials",
      icon: <FaBook />,
    },
    {
      name: "Login History",
      to: "/dashboard/tutor/login-history",
      icon: <FaHistory />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-auto">
      <aside className="lg:w-72 w-full bg-blue-900 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-yellow-300">
            Tutor Dashboard
          </h2>
        </div>
        <nav className="mt-10">
          <ul className="flex gap-3 lg:flex-col lg:gap-6 justify-center items-start">
            {navLinks.map((link) => (
              <li key={link.name} className="lg:w-full">
                <NavLink
                  to={link.to}
                  className={`flex items-center gap-4 px-4 py-3 transition duration-300 ${
                    link.to === pathname
                      ? "bg-yellow-400 text-blue-900 font-semibold"
                      : "hover:bg-yellow-300 hover:text-blue-900"
                  }`}
                >
                  {link.icon}
                  <span className="hidden lg:block">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="bg-base-200 p-2 lg:p-6 rounded-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;
