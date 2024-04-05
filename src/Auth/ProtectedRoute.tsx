import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./Auth";
import { useSelector } from "react-redux";

export const ProtectedRoute: React.FC<{
  Component: React.FC<any>;
  path: any;
  colorInverted?: boolean;
  accessRole?: string[];
}> = ({ Component, accessRole, ...rest }) => {
  const { data } = useSelector((state: any) => state.loginSlice);
  if (isLoggedIn() && !accessRole) {
    return <Component {...rest} />;
  }

  if (isLoggedIn() && accessRole && accessRole.includes(data.role)) {
    return <Component {...rest} />;
  }
  return <Navigate to="/saturno/login/" />;
};

export default ProtectedRoute;
