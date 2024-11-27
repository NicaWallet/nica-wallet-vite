import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteProps {
    redirectPath?: string; // Ruta a donde redirigir si no está autenticado
}

const AuthRoute: React.FC<AuthRouteProps> = ({
    redirectPath = "/auth/login",
}) => {
    const token = localStorage.getItem("token");

    // Si no hay token, redirige a la ruta de login
    if (!token) {
        return <Navigate to={redirectPath} />;
    }

    // Si está autenticado, renderiza las rutas protegidas
    return <Outlet />;
};

export default AuthRoute;
