import { Link } from "react-router-dom"
import { HOME_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE } from "../utils/routes"

const Navbar = () => {
  return (
    <div className="container mx-auto">
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl">
                        <li className="mx-4"><Link to={HOME_ROUTE}>Home</Link></li>
                        <li className="mx-4"><Link>Find CPD</Link></li>
                        <li className="mx-4"><Link to={DASHBOARD_ROUTE}>Dashboard</Link></li>
                    </ul>
                </div>
                <Link to={HOME_ROUTE} className="btn btn-ghost text-2xl text-center">CPD Monitor</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li className="mx-4"><Link to={HOME_ROUTE}>Home</Link></li>
                    <li className="mx-4"><Link>Find CPD</Link></li>
                    <li className="mx-4"><Link to={DASHBOARD_ROUTE}>Dashboard</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link to={LOGIN_ROUTE} className="btn md:btn-wide text-xl">Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar