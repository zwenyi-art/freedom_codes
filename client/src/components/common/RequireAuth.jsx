import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : auth?.user ? (
  //   <Navigate to="/" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : <Navigate to="/" state={{ from: location }} replace />;

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
