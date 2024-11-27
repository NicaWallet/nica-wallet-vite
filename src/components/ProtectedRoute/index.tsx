import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

interface UserRole {
    role: {
        role_name: string;
    };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const userRoles = user.userRoles?.map((role: UserRole) => role.role.role_name) || [];

    // Verificar si el usuario tiene al menos uno de los roles permitidos
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasAccess) {
        return <Navigate to="/welcome" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
