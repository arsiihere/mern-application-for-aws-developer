import React from "react";
import { Navigate } from "react-router-dom";

// This component will check if the user is authenticated before rendering the child components.
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
