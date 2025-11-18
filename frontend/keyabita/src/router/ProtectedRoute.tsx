import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: ReactNode;
  role?: string;
};

/**
 * ProtectedRoute component restricts access to routes based on authentication and role.
 *
 * If the user is not logged in or does not have the required role,
 * it redirects to the login/admin page.
 */
export default function ProtectedRoute({ children, role }: Props) {
  const { admin } = useAuth();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  if (role && admin.role?.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
