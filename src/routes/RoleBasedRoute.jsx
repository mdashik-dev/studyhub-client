import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (allowedRoles.includes(user?.role)) {
      navigate(`/dashboard/${user?.role}`);
    }
  }, []);

  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RoleBasedRoute;
