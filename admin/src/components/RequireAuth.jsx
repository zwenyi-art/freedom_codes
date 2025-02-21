import React from "react";

import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth?.roles) {
    const result = auth?.roles?.find((role) => allowedRoles?.includes(role));
    if (result) {
      return <Outlet />;
    } else {
      if (auth?.accessToken) {
        return (
          <Navigate to="/unauthorize" state={{ from: location }} replace />
        );
      } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
