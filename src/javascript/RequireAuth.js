import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // if user is authenticated, render the child components (Outlet) else redirect to login page
        // state means that we are passing the current location to the login page so that we can redirect back to the current location after login
        allowedRoles.includes(auth?.role) ? <Outlet /> : auth?.user ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
