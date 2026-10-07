// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const hasRefreshToken = !!localStorage.getItem("refreshToken");

  // If the user is not logged in (invalid/expired access token) 
  // AND has no refresh token to attempt a renewal, then redirect.
  if (!isLoggedIn() && !hasRefreshToken) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export default ProtectedRoute;