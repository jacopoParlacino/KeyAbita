import { createContext } from "react";

export type Admin = {
    id: number;
  username: string;
  role: string;
  token: string;
} | null;

type AuthContextType = {
    admin: Admin;
    login: (data: NonNullable<Admin>) => void;
    logout: () => void;
}
// context undefined until set in provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
