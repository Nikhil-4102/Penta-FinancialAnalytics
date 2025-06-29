import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userData = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!token || !userData) {
    return <Navigate to="/admin-login" replace />;
  }

  try {
    const user = JSON.parse(userData);

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/admin-login" replace />;
  }
};

export default ProtectedRoute;
