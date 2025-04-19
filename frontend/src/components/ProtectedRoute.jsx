import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const { user } = useContext(AuthContext);
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
