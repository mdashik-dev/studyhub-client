import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaBook,
  FaPlus,
  FaRegListAlt,
  FaFolder,
  FaHistory,
} from "react-icons/fa";

const Dashboard = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { name: "View Booked Session", to: "/dashboard/student", icon: <FaBook /> },
    {
      name: "Create Note",
      to: "/dashboard/student/create-note",
      icon: <FaPlus />,
    },
    {
      name: "Manage Personal Notes",
      to: "/dashboard/student/manage-notes",
      icon: <FaRegListAlt />,
    },
    {
      name: "View All Study Materials",
      to: "/dashboard/student/view-materials",
      icon: <FaFolder />,
    },
    {
      name: "Login History",
      to: "/dashboard/student/login-history",
      icon: <FaHistory />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-64 w-full bg-gray-800 text-white p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">
          Student Dashboard
        </h2>
        <nav>
          <ul className="flex gap-3 lg:flex-col lg:gap-6 justify-center items-start">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${
                    link.to === pathname ? "bg-blue-600" : "hover:bg-blue-600"
                  }`}
                >
                  {link.icon}
                  <span className="hidden lg:block">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
