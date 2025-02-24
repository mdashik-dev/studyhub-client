import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaHistory,
} from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";

const Dashboard = () => {
  const { pathname } = useLocation();
  const navLinks = [
    {
      name: "Manage Users",
      to: "/dashboard/admin",
      icon: <FaUsers />,
    },
    {
      name: "Manage Sessions",
      to: "/dashboard/admin/manage-sessions",
      icon: <FaChalkboardTeacher />,
    },
    {
      name: "Manage Materials",
      to: "/dashboard/admin/manage-materials",
      icon: <FaFolderOpen />,
    },
    {
      name: "Announce",
      to: "/dashboard/admin/announce",
      icon: <GrAnnounce />,
    },
    {
      name: "Login History",
      to: "/dashboard/admin/login-history",
      icon: <FaHistory />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:hidden w-full bg-gray-900 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-400">
          Admin Dashboard
        </h2>
        <nav>
          <ul className="flex justify-center items-center space-x-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={`flex items-center gap-4 px-4 py-3 transition duration-300 rounded-lg ${
                    link.to === pathname
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  {link.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="lg:w-64 w-full bg-gray-900 text-white p-6 shadow-lg lg:block hidden">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-400">
          Admin Dashboard
        </h2>
        <nav>
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={`flex items-center gap-4 px-4 py-3 transition duration-300 rounded-lg ${
                    link.to === pathname
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
