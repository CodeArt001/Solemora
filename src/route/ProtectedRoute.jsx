import { Navigate, Outlet } from "react-router-dom";

// 1. Helper function to check if the JWT timestamp has passed
const isTokenExpired = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);

    if (!decoded.exp) return false;

    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true; // If token is malformed or invalid, treat as expired
  }
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // 2. USE IT HERE: Check if token is missing OR expired
  if (!token || isTokenExpired(token)) {
    // Purge stale keys automatically when expired
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
