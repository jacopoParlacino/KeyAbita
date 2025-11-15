import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children: ReactNode;
    role?: string;
};

export default function ProtectedRoute({children, role}: Props) {
    const { admin } = useAuth();

    if (!admin) {
        return <Navigate to="/amministrazione" replace/>;
    }

    if (role && admin.role !== role) {
        return <Navigate to="/amministrazione" replace/>;
    }

    return children;
}