import { useState, type ReactNode } from "react";
import { AuthContext} from "../contexts/AuthContext";
import type { Admin } from "../types/Admin";

/**
 * AuthProvider component wraps the app and provides authentication context.
 *
 * Handles:
 * - Storing the current admin in state and localStorage
 * - Logging in an admin
 * - Logging out an admin
 *
 * Usage: Wrap your app with `<AuthProvider>` to access authentication context
 * via the `useAuth` hook.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin>(() => {
    const saved = localStorage.getItem("authAdmin");
    return saved ? JSON.parse(saved) : null;
  });
  const login = (data: NonNullable<Admin>) => {
    setAdmin(data);
    localStorage.setItem("authAdmin", JSON.stringify(data));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("authAdmin");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
