import { createContext } from "react";

/**
 * Represents an admin user object stored in authentication context.
 *
 * @typedef {Object} Admin
 * @property {number} id - Unique identifier for the admin.
 * @property {string} username - Username of the admin.
 * @property {string} role - Role of the admin (e.g., "superadmin", "editor").
 * @property {string} token - Authentication token for API requests.
 *
 * If no admin is logged in, this can be `null`.
 */
export type Admin = {
    id: number;
  username: string;
  role: string;
  token: string;
} | null;

/**
 * Defines the shape of the authentication context.
 *
 * @typedef {Object} AuthContextType
 * @property {Admin} admin - The currently logged-in admin, or `null`.
 * @property {(data: NonNullable<Admin>) => void} login - Function to set the admin when logging in.
 * @property {() => void} logout - Function to clear the admin when logging out.
 */
type AuthContextType = {
    admin: Admin;
    login: (data: NonNullable<Admin>) => void;
    logout: () => void;
}
/**
 * React context for authentication.
 *
 * Provides `admin` state and `login` / `logout` functions.
 *
 * Initially undefined until used inside an `AuthProvider`.
 *
 * @type {React.Context<AuthContextType | undefined>}
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
