import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, ENG_DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE, CPD_DASHBOARD_ROUTE } from "../utils/routes";
import { roles } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [navLinkDashboard, setNavLinkDashboard] = useState(LOGIN_ROUTE);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate(HOME_ROUTE);
    }

    useEffect(() => {
        (!user) ? LOGIN_ROUTE : (user.role === roles.eng) ? setNavLinkDashboard(ENG_DASHBOARD_ROUTE) : (user.role === roles.orgAdmin || user.role === roles.orgSuperAdmin) ? setNavLinkDashboard(ADMIN_DASHBOARD_ROUTE) : setNavLinkDashboard(LOGIN_ROUTE);
    }, [user]);

    return (
        <div className="navbar md:container mx-auto bg-base-100 md:px-16 border-b-2 border-slate-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="mx-4"><Link to={HOME_ROUTE}>Home</Link></li>
                        <li className="mx-4"><Link to={CPD_DASHBOARD_ROUTE}>Find CPD</Link></li>
                        <li className="mx-4"><Link to={navLinkDashboard}>Dashboard</Link></li>
                    </ul>
                </div>
                <Link to={HOME_ROUTE} className="btn btn-ghost text-xl text-center px-0">CPD Monitor</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="mx-4"><Link to={HOME_ROUTE}>Home</Link></li>
                    <li className="mx-4"><Link to={CPD_DASHBOARD_ROUTE}>Find CPD</Link></li>
                    <li className="mx-4"><Link to={navLinkDashboard}>Dashboard</Link></li>
                </ul>
            </div>
            {user ? (
                <>
                    <div className="hidden md:flex navbar-end">
                        <button className="btn bg-red-500 text-slate-800" onClick={onLogout}>Logout
                            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="md:hidden navbar-end ">
                        <IconButton variant='gradient' onClick={onLogout} color='red'>
                            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                        </IconButton>
                    </div>
                </>
            ) : (
                <div className="navbar-end">
                    <Link to={LOGIN_ROUTE} className="btn md:btn-wide">Login</Link>
                </div>
            )}
        </div>
    )
}

export default Navbar