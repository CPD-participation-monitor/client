import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../../utils/routes";

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return (
        // if user is authenticated, render the child components (Outlet) else redirect to login page
        // state means that we are passing the current location to the login page so that we can redirect back to the current location after login
        <>
            {user && allowedRoles.includes(user.role) ? (
                <Outlet />
            ) : (
                <Navigate
                    to={LOGIN_ROUTE}
                    state={{ from: location }}
                    replace
                />
            )}
        </>
    )
}

export default RequireAuth;