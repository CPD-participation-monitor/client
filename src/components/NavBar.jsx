import { React, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import scroll from '../javascript/scroll';

import ROLES from '../constants/roles';

import { images } from '../javascript/imageImports';

const NavBar = () => {
    
    const [navLink, setNavLink] = useState('');
    const { currentUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        scroll();
    });

    useEffect(() => {
        // console.log(currentUser?.role);
        setNavLink(currentUser?.role === ROLES.orgAdmin ? "/orgadmindash" : currentUser?.role === ROLES.eng ? "/engdash" : "/login");
    }, [currentUser]);

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-black p-0 m-0">
            <div className="container-fluid">
                <HashLink className="navbar-brand" to="/">
                    <img className='logo img-fluid' src={images.logo_2} alt="logo" />
                </HashLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className={`navbar-nav justify-content-end py-3 col-12`}>
                        <li className="nav-item">
                            <HashLink className="nav-link px-5 text-light" aria-current="page" to="/">What is CPD?</HashLink>
                        </li>
                        <li className="nav-item nav-link dropdown">
                            <a href="#" id='find-cpd' data-bs-toggle='dropdown' aria-expanded='false' className="dropdown-toggle text-decoration-none text-light px-5">
                                Find CPD
                            </a>
                            <ul className="dropdown-menu" aria-labelledby='find-cpd'>
                                <li>
                                    <HashLink className="dropdown-item nav-link px-5 text-light" to="/findCpdProviders">Providers</HashLink>
                                </li>
                                <li>
                                    <HashLink className="dropdown-item nav-link px-5 text-light" to="/findCpdEvents">Events</HashLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link px-5 text-light" to="/about">About Us</HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link px-5 text-light" to={navLink}>My CPD</HashLink>
                        </li>
                        <li className="nav-item">
                            {currentUser?.user ? <HashLink className='nav-link px-5 text-danger' data-bs-toggle="modal" data-bs-target="#logout-modal">Log Out</HashLink> : <HashLink className="nav-link px-5 text-warning" to="/login">Login</HashLink>}
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;