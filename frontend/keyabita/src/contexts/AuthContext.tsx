import { createContext } from "react";
import type { Admin } from "../types/Admin";


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
