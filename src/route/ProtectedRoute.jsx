import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
