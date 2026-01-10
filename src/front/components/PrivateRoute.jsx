import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children;
}