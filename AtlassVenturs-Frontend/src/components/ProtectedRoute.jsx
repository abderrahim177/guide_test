import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem('token');
    
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (e) {
        user = {};
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const userRoleId = Number(user.role_id);
    const allowed = allowedRoles.map(r => Number(r));

    if (!allowed.includes(userRoleId)) {
        if (userRoleId === 2) {
            return <Navigate to="/guide/requests" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}