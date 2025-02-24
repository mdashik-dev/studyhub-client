import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = false;

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
