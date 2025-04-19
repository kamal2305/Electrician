import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";


const RoleProtectedRoute = ({ allowedRoles, children }) => {
  // const { user } = useContext(AuthContext);
  const { user } = useAuth();

  if (!user?.token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default RoleProtectedRoute;
