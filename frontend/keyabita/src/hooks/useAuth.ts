import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


/**
 * Custom hook to access authentication context.
 *
 * @throws Will throw an error if used outside of an AuthProvider.
 *
 * @returns {Object} The authentication context containing user info and auth functions.
 *
 */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}