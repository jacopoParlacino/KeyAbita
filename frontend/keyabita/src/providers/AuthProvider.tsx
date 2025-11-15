import { useState, type ReactNode } from "react";
import { AuthContext, type Admin } from "../contexts/AuthContext";

export const AuthProvider = ({children}: {children: ReactNode }) => {
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
    }

    return <AuthContext.Provider value={ {admin, login, logout } }>
        {children}
        </AuthContext.Provider>
};
